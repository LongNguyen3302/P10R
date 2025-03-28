import openai
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Retrieve the API key from environment
api_key = os.getenv("OPENAI_API_KEY")

# Ensure API key is set
if not api_key:
    raise ValueError("API key is missing! Set it in a .env file or environment variables.")

# Initialize OpenAI client
openai.api_key = api_key

@app.route("/generate", methods=["POST"])
def generate_response():
    try:
        # Get JSON request data
        data = request.get_json()
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Call OpenAI API (using gpt-4o-mini model)
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # Use GPT-4o-mini model
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100,  # Adjust the tokens as needed
        )

        # Extract the generated response
        generated_text = response["choices"][0]["message"]["content"].strip()

        return jsonify({"generated_text": generated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
