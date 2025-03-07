from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline

# Load the Legal-BERT model
model_name = "nlpaueb/legal-bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

# Create a question-answering pipeline
qa_pipeline = pipeline("question-answering", model=model, tokenizer=tokenizer)
context = """
A contract is a legally binding agreement between two or more parties.
A breach of contract occurs when one party fails to fulfill its obligations under the agreement.
Remedies for breach may include damages, specific performance, or termination of the contract.
"""

question = "What happens if someone breaches a contract?"

response = qa_pipeline({"question": question, "context": context})
print(response["answer"])
