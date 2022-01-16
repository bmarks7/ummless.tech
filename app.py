from textwrap import fill
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os
import requests
import json
from datetime import datetime
import re

app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://postgres:123456@localhost:5555/ummless"
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
  __tablename__='user'
  userId=db.Column(db.Integer,primary_key=True)
  name=db.Column(db.String(100))
  email=db.Column(db.String(100))

  speeches = db.relationship('Speech', backref='User', lazy=True)

  def __init__(self,name,email):
    self.name=name
    self.email=email

class Speech(db.Model):
  __tablename__='speech'
  speechId=db.Column(db.Integer,primary_key=True)
  link=db.Column(db.Integer)
  createdAt=db.Column(db.DateTime)
  userId=db.Column(db.Integer,db.ForeignKey('user.userId'))
  score=db.Column(db.Integer)
  averageWPM=db.Column(db.Integer)
  averageSentiment=db.Column(db.Integer)
  numFillerWords=db.Column(db.Integer)

  speechDetails = db.relationship('SpeechDetails', backref='Speech', lazy=True, uselist=False)

  def __init__(self,link,createdAt,userId,score,averageWPM,averageSentiment,numFillerWords):
    self.link=link
    self.createdAt=createdAt
    self.userId=userId
    self.score=score
    self.averageWPM=averageWPM
    self.averageSentiment=averageSentiment
    self.numFillerWords=numFillerWords


class SpeechDetails(db.Model):
  __tablename__='speechDetails'
  speechDetailsId=db.Column(db.Integer,primary_key=True)
  speechId=db.Column(db.Integer,db.ForeignKey('speech.speechId'))
  textChunk=db.Column(db.String(1000))
  sentiment=db.Column(db.Float)
  startTime=db.Column(db.Integer)
  endTime=db.Column(db.Integer)
  fillerCount=db.Column(db.Integer)
  wordCount=db.Column(db.Integer)
  speechRate=db.Column(db.Integer)

  def __init__(self,speechId,textChunk,sentiment,startTime,endTime,fillerCount,wordCount,speechRate):
    self.speechId=speechId
    self.textChunk=textChunk
    self.sentiment=sentiment
    self.startTime=startTime
    self.endTime=endTime
    self.fillerCount=fillerCount
    self.wordCount=wordCount
    self.speechRate=speechRate


def return_summary(speechId):
  return ''

def return_in_depth_analysis(speechId):
  return ''

def get_average_sentiment(sentiment_analysis_results):
  size = len(sentiment_analysis_results)
  total_sentiment = 0
  if size != 0:
    for sentiment in sentiment_analysis_results:
      if sentiment['sentiment'] == 'POSITIVE':
        ++total_sentiment
      elif sentiment['sentiment'] == 'NEGATIVE':
        --total_sentiment
    return total_sentiment / size
  return 0

def get_num_filler_words(text):
  count = sum(1 for match in re.finditer(r"\buh{0,3}\b|\bum{0,3}\b", text))
  return count

def store_analysis_data(response):
  # response = json.loads(response)

  new_user = User(name='Mohit', email='mohitlal31@gmail.com')
  db.session.add(new_user)
  db.session.commit()
  userId = new_user.userId

  score = 0
  averageWPM = len(response['words']) / (response['audio_duration'] * 60)
  averageSentiment = get_average_sentiment(response['sentiment_analysis_results'])
  numFillerWords = get_num_filler_words(response['text'])
  new_speech = Speech(link='', createdAt=datetime.now(), score=score, userId=userId, averageWPM=averageWPM, \
    averageSentiment=averageSentiment, numFillerWords=numFillerWords)
  db.session.add(new_speech)
  db.session.commit()
  speechId = new_speech.speechId

  for sentiment in response['sentiment_analysis_results']:
    textChunk = sentiment['text']
    sentimentValue = 0
    if sentiment['sentiment'] == 'POSITIVE':
      sentimentValue = 1 
    elif sentiment['sentiment'] == 'NEGATIVE':
      sentimentValue = -1
    fillerCount = get_num_filler_words(sentiment['text'])
    wordCount = len(re.findall(r'\w+', sentiment['text']))
    new_speech_details = SpeechDetails(speechId=speechId, textChunk=textChunk, sentiment=sentimentValue, startTime=sentiment['start'], \
      endTime=sentiment['end'], fillerCount=fillerCount, wordCount=wordCount, speechRate=0)
    db.session.add(new_speech_details)
  db.session.commit()
  return ''

auth_key = 'f8173fb4ee264143bc2c88ac85fd0cfc'

headers = {
    "authorization": auth_key,
    "content-type": "application/json"
}

def read_file(filename):
   with open(filename, 'rb') as _file:
       while True:
           data = _file.read(5242880)
           if not data:
               break
           yield data


@app.route('/upload', methods=['POST'])
def upload_audio_file():
  print(request.get_json())
  print(request.headers)
  save_path = os.path.join("D:\\Downloads\\", "temp.mp3")
  print("save_path = {}".format(save_path))
  request.files['music_file'].save(save_path)

  upload_response = requests.post('https://api.assemblyai.com/v2/upload', headers=headers, data=read_file(save_path))
  print(upload_response.json())
  audio_url = upload_response.json()['upload_url']

  transcript_request = {'audio_url': audio_url}
  data = {"audio_url": audio_url, "disfluencies": True, "auto_chapters": True, "sentiment_analysis": True}

  endpoint = "https://api.assemblyai.com/v2/transcript"
  transcript_response = requests.post(endpoint, json=data, headers=headers)
  _id = transcript_response.json()['id']
  print("_id = {}".format(_id))

  endpoint = "https://api.assemblyai.com/v2/transcript/" + _id
  polling_response = requests.get(endpoint, headers=headers)
  if polling_response.json()['status'] != 'completed':
    print(polling_response.json())
  else:
    with open(_id + '.txt', 'w') as f:
        f.write(polling_response.json()['text'])
    print('Transcript saved to', _id, '.txt')
  return '', 204

# Call this after the post request above to know whether the upload and analysis is complete.
# Call all other APIs only once this method returns 'completed'
@app.route('/transcript')
def get_transcript():
  _id = request.args['id']
  endpoint = "https://api.assemblyai.com/v2/transcript/" + _id
  polling_response = requests.get(endpoint, headers=headers)

  if polling_response.json()['status'] == 'completed':
    store_analysis_data(polling_response.json())
  return jsonify(status = polling_response.json()['status'])

@app.route('/summary')
def get_summary():
  speechId = request.args.get('speechId')
  # userId = request.args.get('userId')
  return jsonify(return_summary(speechId))

@app.route('/in_depth_analysis')
def get_in_depth_analysis():
  speechId = request.args.get('speechId')
  # userId = request.args.get('userId')
  return jsonify(return_in_depth_analysis(speechId))

if __name__ == '__main__':
    app.run(debug=True)