import json
import os
import random

from img_generation import generate_img
from prompt_generation import generate_prompts
import argparse

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--topics", type=str, default="topics.txt")
    parser.add_argument("-n", type=int, default=4)
    return parser.parse_args()


def generate_batch(topic, style, n):
    cur_dir = f"new_imgs/{topic.replace(' ', '_')}-{style.replace(' ', '_')}"
    os.makedirs(cur_dir, exist_ok=True)

    prompts = generate_prompts(topic, style, n)
    print(f"Generated prompts: {prompts}")

    data = [
        {
            "id": i,
            "topic": topic,
            "style": style,
            "prompt": prompt
        }
        for i, prompt in enumerate(prompts)
    ]

    with open(f"{cur_dir}/data.json", "w") as f:
        json.dump(data, f)

    for i, prompt in enumerate(prompts):
        print(f"Generating image {i}...")
        img = generate_img(prompt)
        img.save(f"{cur_dir}/{i}.png")


if __name__ == "__main__":
    args = parse_args()
    styles = ["digital art", "abstract", "realistic", "cartoon", "anime", "sketch", "watercolor"]

    topics = open(args.topics).read().splitlines()
    for topic in topics:
        print(f"Generating batch for topic {topic}...")
        try:
            style = random.choice(styles)
            generate_batch(topic, style, args.n)
        except Exception as e:
            print(f"Error generating batch for topic {topic}: {e}")
            continue