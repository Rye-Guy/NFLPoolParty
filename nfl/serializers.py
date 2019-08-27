from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import NFLGame, UserPicks, NFLTeam


        
class GamesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NFLGame
        depth = 1
        fields = ['id', 'team_1', 'team_2', 'winner', 'week', 'date']
        
class UserPicksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserPicks
        depth = 2
        fields = ['user', 'games', 'teams', 'points_awarded']

class DjangoUsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password']

class DjangoUserWithTokenSerializer(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    class Meta:
        model = User
        fields = ['token', 'username', 'password']


