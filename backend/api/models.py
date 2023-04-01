from django.db import models

class Prompt(models.Model):
    text = models.TextField(max_length=200)
