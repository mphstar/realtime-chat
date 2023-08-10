# API
import json
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin

# SETUP PROGRAM!!
app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app, cors_allowed_origins="*")

def load_chat_history(file_path):
    chat_history = []

    with open(file_path, 'r') as file:
        for line in file:
            chat_data = json.loads(line)
            chat_history.append(chat_data)

    return chat_history

def save_to_file(data):
    with open('chat_history.txt', 'a') as file:
        json.dump(data, file)
        file.write('\n')

@socketio.on("connect")
def connect():
    print("suces konek")
    emit("chat", load_chat_history('chat_history.txt'))

@socketio.on("sendMsg")
def sendMsg(sender, msg, id):
    print("Success")
    save_to_file({"sender": sender, "msg": msg, "id": id})
    
    emit("receiveMsg", {"sender": sender, "msg": msg, "id": id}, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
