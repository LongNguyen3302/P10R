import requests
import json

# URL of your Flask API endpoint
url = "http://127.0.0.1:5000/generate"

# Ask the user for a prompt
user_prompt = input("Enter your prompt: ")

# Data to send in the request
data = {
    "prompt": user_prompt
}

# Send POST request to the Flask API
response = requests.post(url, json=data)

# Print the response from the API
if response.status_code == 200:
    response_data = response.json()  # Parse JSON response
    print("Generated text:", response_data.get("generated_text"))
else:
    print(f"Error: {response.status_code}, {response.text}")
