import json
import os

import requests

URL_BASE = "http://localhost:8000"

game_ids = {
    "abstract": 1,
    "tech": 2,
    "people": 3,
    "nature": 4,
    "random": 5
}


def upload_set(game_id, img_paths, prompts):
    assert len(img_paths) == len(prompts)

    files = [("media", open(path, "rb")) for path in img_paths]
    files += [("prompts", prompt.encode()) for prompt in prompts]

    res = requests.post(
        url=URL_BASE + f"/api/upload/{game_id}",
        files=files
    )
    return res


BASE_DIR = "img"
if __name__ == "__main__":
    # iterate over dirs
    for dir in os.listdir(BASE_DIR):
        # get list of files in that dir
        try:
            files = os.listdir(f"{BASE_DIR}/{dir}")
            assert files != []
            if "category" in files:
                category = open(f"{BASE_DIR}/{dir}/category").read().strip()
                game_id = game_ids[category]
            else:
                game_id = game_ids["random"]

            with open(f"{BASE_DIR}/{dir}/data.json") as f:
                data = json.load(f)
            prompts = [d["prompt"] for d in data]
            img_paths = [f for f in files if f.endswith(".png")]
            img_paths = sorted(img_paths)
            img_paths = [f"{BASE_DIR}/{dir}/{path}" for path in img_paths]

            assert len(img_paths) == len(prompts)

            res = upload_set(game_id, img_paths, prompts)
            print("uplaoding", dir, res.status_code)

        except Exception as e:
            print(e)
            print(f"skipping {dir}")
            continue
