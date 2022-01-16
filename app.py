from textwrap import fill
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import requests
import json
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

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
  averageSentiment=db.Column(db.Float)
  numFillerWords=db.Column(db.Integer)
  duration=db.Column(db.Integer)

  speechDetails = db.relationship('SpeechDetails', backref='Speech', lazy=True, uselist=False)

  def __init__(self,link,createdAt,userId,score,averageWPM,averageSentiment,numFillerWords,duration):
    self.link=link
    self.createdAt=createdAt
    self.userId=userId
    self.score=score
    self.averageWPM=averageWPM
    self.averageSentiment=averageSentiment
    self.numFillerWords=numFillerWords
    self.duration=duration


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
  speech = Speech.query.filter_by(speechId=speechId).first()
  filler_words_per_minute = speech.numFillerWords / (speech.duration / 60)
  return jsonify(filler_words_per_minute=filler_words_per_minute, speaking_speed=speech.averageWPM, \
    average_sentiment=speech.averageSentiment, score=speech.score)

def return_in_depth_analysis(speechId):
  speechDetailsList = SpeechDetails.query.filter_by(speechId=speechId).all()
  print("Length of speechDetailsList = {}".format(speechDetailsList))
  inDepthMetrics = []
  for speechDetails in speechDetailsList:
    textChunk = speechDetails.textChunk
    sentiment = speechDetails.sentiment
    duration = (speechDetails.endTime - speechDetails.startTime) / 1000
    speed = speechDetails.speechRate
    inDepthMetric = {'textChunk': textChunk, 'sentiment': sentiment, 'duration': duration, 'speed': speed}
    print("inDepthMetric = {}".format(inDepthMetric))
    inDepthMetrics.append(inDepthMetric)
  return jsonify(inDepthMetrics)

def get_average_sentiment(sentiment_analysis_results):
  size = len(sentiment_analysis_results)
  total_sentiment = 0.0
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

def return_user_history(userId):
  speechList = Speech.query.filter_by(userId=userId).all()
  userHistoryList = []
  for speech in speechList:
    date = speech.createdAt
    score = speech.score
    numFillerWords = speech.numFillerWords
    averageWPM = speech.averageWPM
    averageSentiment = speech.averageSentiment
    userHistory = {'date': date, 'score': score, 'numFillerWords': numFillerWords, 'averageWPM': averageWPM, \
      'averageSentiment': averageSentiment}
    print("inDepthMetric = {}".format(userHistory))
    userHistoryList.append(userHistory)
  return jsonify(userHistoryList)

def calculate_score(fillerWPM, speakingSpeed, averageSentiment):
  speakingSpeedScore = 100 - abs(speakingSpeed - 140)
  fillerWPMScore = 100 - fillerWPM
  # NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
  averageSentimentScore = ((averageSentiment + 1) * 100 / 2)
  return (speakingSpeedScore + fillerWPMScore + averageSentimentScore) / 3

def store_analysis_data(response):
  # response = json.loads(response)

  new_user = User(name='Mohit', email='mohitlal31@gmail.com')
  db.session.add(new_user)
  db.session.commit()
  userId = new_user.userId

  averageWPM = len(response['words']) / (response['audio_duration'] / 60)
  averageSentiment = get_average_sentiment(response['sentiment_analysis_results'])
  numFillerWords = get_num_filler_words(response['text'])
  score = calculate_score(numFillerWords / (response['audio_duration'] / 60), averageWPM, averageSentiment)
  new_speech = Speech(link='', createdAt=datetime.now(), score=score, userId=userId, averageWPM=averageWPM, \
    averageSentiment=averageSentiment, numFillerWords=numFillerWords, duration=response['audio_duration'])
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
    speechRate = wordCount / ((sentiment['end'] - sentiment['start']) / 1000 / 60)
    new_speech_details = SpeechDetails(speechId=speechId, textChunk=textChunk, sentiment=sentimentValue, startTime=sentiment['start'], \
      endTime=sentiment['end'], fillerCount=fillerCount, wordCount=wordCount, speechRate=speechRate)
    db.session.add(new_speech_details)
  db.session.commit()
  return {'speechId': speechId, 'userId': userId}

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
  return jsonify(id = _id)

# Call this after the post request above to know whether the upload and analysis is complete.
# Call all other APIs only once this method returns 'completed'
@app.route('/transcript')
def get_transcript():
  _id = request.args['id']
  endpoint = "https://api.assemblyai.com/v2/transcript/" + _id
  polling_response = requests.get(endpoint, headers=headers)

  if polling_response.json()['status'] == 'completed':
    # speechId = store_analysis_data(polling_response.json())
    res = store_analysis_data(polling_response.json())
    # return jsonify(status = polling_response.json()['status'], speechId=speechId)
    return jsonify(res)
  return jsonify(status = polling_response.json()['status'])

@app.route('/summary')
def get_summary():
  speechId = request.args.get('speechId')
  # userId = request.args.get('userId')
  return return_summary(speechId)

@app.route('/in_depth_analysis')
def get_in_depth_analysis():
  speechId = request.args.get('speechId')
  # userId = request.args.get('userId')
  return return_in_depth_analysis(speechId)

@app.route('/history')
def get_user_history():
  # speechId = request.args.get('speechId')
  userId = request.args.get('userId')
  return return_user_history(userId)

if __name__ == '__main__':
    app.run(debug=True)