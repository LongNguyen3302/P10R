from flask import Flask, request, jsonify
from cryptography.fernet import Fernet
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Generate or load encryption key
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
if not ENCRYPTION_KEY:
    raise ValueError("ENCRYPTION_KEY is missing! Set it in the .env file.")

cipher = Fernet(ENCRYPTION_KEY)

# Route to encrypt data
@app.route("/encrypt", methods=["POST"])
def encrypt_data():
    try:
        data = request.json.get("data")
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Encrypt the data
        encrypted_data = cipher.encrypt(data.encode())
        return jsonify({"encrypted_data": encrypted_data.decode()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to decrypt data
@app.route("/decrypt", methods=["POST"])
def decrypt_data():
    try:
        encrypted_data = request.json.get("encrypted_data")
        if not encrypted_data:
            return jsonify({"error": "No encrypted data provided"}), 400

        # Decrypt the data
        decrypted_data = cipher.decrypt(encrypted_data.encode()).decode()
        return jsonify({"decrypted_data": decrypted_data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Secure API route
@app.route("/secure-api", methods=["POST"])
def secure_api():
    try:
        # Get sensitive data from the request
        sensitive_data = request.json.get("sensitive_data")
        if not sensitive_data:
            return jsonify({"error": "No sensitive data provided"}), 400

        # Encrypt the sensitive data
        encrypted_data = cipher.encrypt(sensitive_data.encode())

        # Simulate processing (e.g., storing encrypted data)
        return jsonify({"message": "Data processed securely", "encrypted_data": encrypted_data.decode()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New /generate endpoint
@app.route("/generate", methods=["POST"])
def generate_response():
    try:
        prompt = request.json.get("prompt")
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        # Simulate generating a response (replace with actual logic if needed)
        generated_text = f"Generated response for: {prompt}"

        return jsonify({"generated_text": generated_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)