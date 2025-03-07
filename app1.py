from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app) # Enable CORS to allow frontend requests

# Load Legal-BERT model
print("Loading Legal-BERT model...")
legal_qa = pipeline("question-answering", model="nlpaueb/legal-bert-small-uncased")

@app.route("/ask", methods=["POST"])
def ask_question():
try:
data = request.json
question = data.get("question", "").strip()
context = data.get("context", "").strip()

if not question or not context:
return jsonify({"error": "Please provide both question and context"}), 400

# Perform Legal-BERT Question Answering
answer = legal_qa(question=question, context=context, top_k=1, max_answer_len=300)

print("RAW OUTPUT:", answer) # Debugging

full_answer = answer[0]["answer"].strip() if isinstance(answer, list) else answer["answer"].strip()

return jsonify({"answer": full_answer})

except Exception as e:
return jsonify({"error": f"Something went wrong: {str(e)}"}), 500

if __name__ == "__main__":
app.run(debug=True)
