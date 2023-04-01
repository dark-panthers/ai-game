import os

import requests
import io
from PIL import Image
from dotenv import load_dotenv
import matplotlib.pyplot as plt

load_dotenv()

API_URL = os.getenv("HUGGINGFACE_API_URL")
TOKEN = os.getenv("HUGGINGFACE_TOKEN")


def generate_img(prompt):
    response = requests.post(
        API_URL,
        headers={"Authorization": f"Bearer {TOKEN}"},
        json={
            "inputs": prompt,
        },
        timeout=60,
    )
    image = Image.open(io.BytesIO(response.content))
    return image


if __name__ == "__main__":

    img = generate_img("Astronaut a horse with a cowboy hat on a beach")
    plt.imshow(img)
    plt.show()