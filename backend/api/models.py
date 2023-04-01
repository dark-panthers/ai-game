from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.name
    
class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    prompt = models.CharField(max_length=1000)
    def __str__(self):
        return self.prompt
    

class ImageSet(models.Model):
    image = models.ManyToManyField(Image)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

    def __str__(self):
        return self.game.name
