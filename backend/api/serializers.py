from rest_framework import serializers
from django import forms
from api.models import Game, Image, Set


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ImageSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = '__all__'

class ImageFormSerializer(forms.ModelForm):
    class Meta:
        model = Image
        fields = '__all__'

