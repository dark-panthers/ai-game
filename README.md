# ai-game

## Setup

### Backend
Prerequisites: docker, python
```bash
docker run -p 6379:6379 -d redis
```
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```
### Fronend
Prerequisites: Node
```bash
cd frontend
npm i
npm start
```
### MOCKUPS
Zdjęcie przedstawiające wizje naszej aplikacji od strony Front-Endu:
![alt text](https://github.com/dark-panthers/ai-game/blob/main/mockup.jpeg)
Zawarte są w niej szkice poszczególnych podstron: Home Page, Start Page, Game Page

Oficjalna wersja stylizacji CSS, była przeprowadzona po zakończeniu pracy nad wszystkimi podstronami, by ujednolicić motyw.
