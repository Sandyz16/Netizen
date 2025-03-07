from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")
    context = data.get("context", "A legal contract is an agreement between two or more parties.")  # Default context

    response = qa_pipeline({"question": question, "context": context})
    return jsonify({"answer": response["answer"]})

if __name__ == "__main__":
    app.run(debug=True)
