import requests
import json

# URL of your Flask API endpoint
url = "http://127.0.0.1:5000/encrypt"

# Ask the user for data to encrypt
user_data = input("Enter the data to encrypt: ")

# Data to send in the request
data = {
    "data": user_data
}

# Send POST request to the Flask API
response = requests.post(url, json=data)

# Print the response from the API
if response.status_code == 200:
    response_data = response.json()  # Parse JSON response
    print("Encrypted data:", response_data.get("encrypted_data"))
else:
    print(f"Error: {response.status_code}, {response.text}")