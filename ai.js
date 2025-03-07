from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
import torch

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend requests

# Load Legal-BERT model and tokenizer
print("Loading Legal-BERT model...")
model_name = "nlpaueb/legal-bert-small-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

@app.route("/ask", methods=["POST"])
def ask_question():
    try:
        data = request.json
        question = data.get("question", "").strip()
        context = data.get("context", "").strip()

        if not question or not context:
            return jsonify({"error": "Please provide both question and context"}), 400

        # Tokenize input
        inputs = tokenizer.encode_plus(question, context, return_tensors="pt", max_length=512, truncation=True)
        
        # Get model output
        outputs = model(**inputs)
        answer_start = torch.argmax(outputs.start_logits)
        answer_end = torch.argmax(outputs.end_logits) + 1

        # Extract answer
        answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(inputs["input_ids"][0][answer_start:answer_end]))

        # Debugging information
        print("Question:", question)
        print("Context:", context)
        print("Raw answer:", answer)
        print("Answer start:", answer_start.item())
        print("Answer end:", answer_end.item())

        return jsonify({"answer": answer})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": f"Something went wrong: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
