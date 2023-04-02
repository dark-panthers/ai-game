from django.db import models


class Game(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    image = models.ImageField(upload_to="images/")


class Set(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)


class Image(models.Model):
    set = models.ForeignKey(Set, on_delete=models.CASCADE)
    prompt = models.CharField(max_length=1000)
    image = models.ImageField(upload_to="images/")

#multiplayer
class Session(models.Model):
    code = models.CharField(max_length=100)

class Round(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)

class Player(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    nick = models.CharField(max_length=50, default="UNKNOWN")

class Vote(models.Model):
    round = models.ForeignKey(Round, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    correct = models.BooleanField()
    
