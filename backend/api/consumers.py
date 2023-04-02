import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from dataclasses import dataclass
from .models import Session, Player, Round



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

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_name, self.channel_name
        )

    def receive(self, text_data):
        pass
        # text_data_json = json.loads(text_data)
        # type = text_data_json["type"]

        # event = type

        # async_to_sync(self.channel_layer.group_send)(
        #     self.game_name, {"type": "event", "event": event}
        # )
        print(text_data)
    
    def event(self, event_message):
        event = event_message['event']
        self.send(text_data=event)
        print("Revieving")


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

        async_to_sync(self.channel_layer.group_send)(
            self.game_name, {"type": "event", "event": "test"}
        )
        print("Sending")

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_name, self.channel_name
        )

    def receive(self, text_data):
        print(text_data)
        pass
        # text_data_json = json.loads(text_data)
        # type = text_data_json["type"]

        # event = type

        # async_to_sync(self.channel_layer.group_send)(
        #     self.game_name, {"type": "event", "event": event}
        # )
    
    def event(self, event_message):
        event = event_message['event']
        print("Revieving")
        print(event)
        self.send(text_data=event)

        