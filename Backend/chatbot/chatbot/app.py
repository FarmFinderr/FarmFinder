from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import json
from langdetect import detect
import torch

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

app = Flask(__name__)
CORS(app)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r', encoding='utf-8', errors='ignore') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "FarmFinderIA"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        lang = detect(user_message)
        if lang not in ['fr', 'en', 'ar']:
            return jsonify({"response": f"Désolé, je ne comprends que le français, l'anglais ou l'arabe."})
    except:
        return jsonify({"response": f"Erreur lors de la détection de la langue."})

    # Prétraiter le message
    sentence = tokenize(user_message)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    # Obtenir la réponse du modèle
    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return jsonify({"response": random.choice(intent['responses'])})
    else:
        if lang == "fr":
            return jsonify({"response":"Je ne comprends pas... Pouvez-vous reformuler ?"})
        elif lang == "ar":
            return jsonify({"response":"عذرًا، لم أفهم... هل يمكنك إعادة صياغة الجملة؟"})
        else:
            return jsonify({"response": "I do not understand..."})


if __name__ == '__main__':
    app.run(debug=True, port=5050)
