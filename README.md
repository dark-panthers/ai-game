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
