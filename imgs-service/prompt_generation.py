import os
import openai
import dotenv
import re

dotenv.load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_prompts(topic, style, n=3):
    result = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a pattern-following assistant helping create prompts for image generation. You are given a topic and you need to create a short prompt that will generate images related to that topic."
            },
            {
                "role": "system",
                "name": "example_user",
                "content": "Topic: Dog\n"
                           "Style: Digital art\n"
                           "Generate 3 similar prompts."
            },
            {
                "role": "system",
                "name": "example_assisstant",
                "content": "Prompts:\n:"
                           "1. Friendly Golden Retriever in a lush green park on a sunny day, digital art.\n"
                           "2. French Bulldog peeking over a kitchen counter, eyeing a plate of cookies, digital art.\n"
                           "3. Fluffy white Pomeranian sitting on a pink cushion, digital art.\n"
            },
            {
                "role": "user",
                "content": f"Topic: {topic}\n"
                            f"Style: {style}\n"
                            f"Generate {n} similar prompts."
            }
        ],
        max_tokens=500,
        temperature=1.0
    )

    response = result.choices[0].message.content
    # parse response
    prompts = re.findall(r"\d+\.\s.*", response)
    prompts = [prompt.replace(f"{i+1}. ", "") for i, prompt in enumerate(prompts)]
    return prompts
