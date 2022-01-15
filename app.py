from flask import Flask, jsonify, request
import os
import requests

app = Flask(__name__)

incomes = [
  { 'description': 'salary', 'amount': 5000 }
]

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

@app.route('/incomes')
def get_incomes():
  return jsonify(incomes)


@app.route('/upload', methods=['POST'])
def upload_audio_file():
  print(request.get_json())
  print(request.headers)
  save_path = os.path.join("D:\\Downloads\\", "temp.mp3")
  request.files['music_file'].save(save_path)

  data = {"audio_url": save_path, "disfluencies": True}

  upload_response = requests.post('https://api.assemblyai.com/v2/upload', headers=headers, data=data)
  print(upload_response.json())
  audio_url = upload_response.json()['upload_url']

  transcript_request = {'audio_url': audio_url}
  endpoint = "https://api.assemblyai.com/v2/transcript"
  transcript_response = requests.post(endpoint, json=transcript_request, headers=headers)
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

@app.route('/transcript')
def get_transcript():
  _id = request.args['id']
  endpoint = "https://api.assemblyai.com/v2/transcript/" + _id
  polling_response = requests.get(endpoint, headers=headers)
  return polling_response.json()