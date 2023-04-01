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