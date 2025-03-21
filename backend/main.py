import openai
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Retrieve the API key from environment
api_key = os.getenv("OPENAI_API_KEY")

# Ensure API key is set
if not api_key:
    raise ValueError("API key is missing! Set it in a .env file or environment variables.")

# Initialize OpenAI client
openai.api_key = api_key

# Pydantic model for input data
class UserInput(BaseModel):
    prompt: str

@app.post("/generate/")
async def generate_response(user_input: UserInput):
    try:
        # Correct the API call for GPT models
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # Use GPT-4o-mini or another model you have access to
            messages=[{"role": "user", "content": user_input.prompt}],
            max_tokens=100,  # Adjust the tokens as needed
        )

        # Extract the generated response
        generated_text = response['choices'][0]['message']['content'].strip()

        return {"generated_text": generated_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
