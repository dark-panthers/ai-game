import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from dataclasses import dataclass
from .models import Session, Player, Set, Image
from random import choice, sample
from .serializers import ImageSerializer

def round():
    pk = 1
    limit = 4
    sets_pks = Set.objects.filter(game_id=pk).values_list('pk', flat=True)
    random_set_pk = choice(sets_pks)

    images = list(Image.objects.filter(set_id=random_set_pk))

    limit = min(limit, len(images))

    selected_images = sample(images, limit)
    serializer = ImageSerializer(selected_images, many=True)
    return serializer.data

class PlayerConsumer(WebsocketConsumer):
    def connect(self):
        self.game_code = self.scope["url_route"]["kwargs"]["code"]
        self.nick = self.scope["url_route"]["kwargs"]["nick"]
        self.game_name = f"game_{self.game_code}"

        async_to_sync(self.channel_layer.group_add)(
            self.game_name, self.channel_name
        )

        self.session = Session.objects.get(code=self.game_code)
        Player(session_id=self.session.id, nick=self.nick).save()

        self.accept()
    

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_name, self.channel_name
        )

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)(
            self.game_name, {"type": "event", "event": text_data}
        )
    
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

        self.session = Session.objects.get(code=self.game_code)
        Player(session_id=self.session.id, nick=self.nick).save()
        
        self.players = len(Player.objects.filter(session_id=self.session.id))
        print(self.players)
        self.max_rounds = 4
        

        self.current_round = 0
        self.rounds = [{} for _ in range(self.max_rounds)]

        event = {"type": "round", "data": round()}
        self.send_layer(event)

    def send_layer(self, event):
        print("Send layer")
        print(event)
        print(type(event))
        async_to_sync(self.channel_layer.group_send)(
            self.game_name, {"type": "event", "event": json.dumps(event)}
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_name, self.channel_name
        )

    def receive(self, text_data):
        self.send_layer(text_data)
    
    def event(self, event_message):
        event = json.loads(event_message['event'])
        if type(event) == str:
            event = json.loads(event)
        print("Recieved in host")
        print(event)
        print(type(event))

        if event["type"] == "vote":
            nick = event["data"]["nick"]
            correct = event["data"]["correct"]
            self.rounds[self.current_round][nick] = correct
            print(self.rounds)

            if len(self.rounds[self.current_round]) == self.players:
                self.current_round += 1
            
                if self.current_round < self.max_rounds:
                    # send another round
                    self.send_layer({"type": "round", "data": round()})
                else:
                    # send results
                    nicks = Player.objects.filter(session_id=self.session.id).values_list('nick', flat=True)
                    res = {n: 0 for n in nicks}
                    for nick in nicks:
                        for r in range(self.max_rounds):
                            if self.rounds[r][nick]:
                                res[nick] += 1
                    self.send_layer({"type": "results", "data": json.dumps(res)})
        
        if event["type"] == "round" or event['type'] == "results":
            self.send(text_data=json.dumps(event))