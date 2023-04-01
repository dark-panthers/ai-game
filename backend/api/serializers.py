from rest_framework import serializers
from django import forms
from api.models import Game, Image, ImageSet


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ImageSetSerializer(serializers.ModelSerializer):
    image = ImageSerializer(many=True)
    class Meta:
        model = ImageSet
        fields = '__all__'

class ImageSetSerializerNames(serializers.ModelSerializer):
    class Meta:
        model = ImageSet
        fields = ['name', 'id']




