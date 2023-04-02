import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from dataclasses import dataclass
from .models import Session, Player

@dataclass
class Round:
    votes: dict[str, bool]

class PlayerConsumer(WebsocketConsumer):
    def connect(self):
        self.game_code = self.scope["url_route"]["kwargs"]["code"]
        self.nick = self.scope["url_route"]["kwargs"]["nick"]
        self.game_name = f"game_{self.game_code}"

        async_to_sync(self.channel_layer.group_add)(
            self.game_name, self.channel_name
        )

        session = Session.objects.get(code=self.game_code)
        Player(session_id=session.id, nick=self.nick).save()

        self.accept()
    
    def send_layer(self, event):
        async_to_sync(self.channel_layer.group_send)(
            self.game_name, {"type": "event", "event": json.dumps(event)}
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_name, self.channel_name
        )

    def receive(self, text_data):
        event = json.loads(text_data)
        self.send_layer(event)
    
    def event(self, event_message):
        event = event_message['event']
        self.send(text_data=event)


class HostConsumer(WebsocketConsumer):
    def connect(self):
        self.game_code = self.scope["url_route"]["kwargs"]["code"]
        self.nick = self.scope["url_route"]["kwargs"]["nick"]
        self.game_name = f"game_{self.game_code}"

        async_to_sync(self.channel_layer.group_add)(
            self.game_name, self.channel_name
        )

        self.accept()

        session = Session.objects.get(code=self.game_code)
        Player(session_id=session.id, nick=self.nick).save()
        

        self.current_round = 0
        self.rounds = [Round(votes = {})]

        event = {"type": "round", "data": {"round": "data"}}
        self.send_layer(event)

    def send_layer(self, event):
        async_to_sync(self.channel_layer.group_send)(
            self.game_name, {"type": "event", "event": json.dumps(event)}
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_name, self.channel_name
        )

    def receive(self, text_data):
        event = json.loads(text_data)
        print(event)
    
    def event(self, event_message):
        event = event_message['event']
        self.send(text_data=event)

        