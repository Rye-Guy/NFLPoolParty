from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import NFLGame, UserPicks


class GamesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NFLGame
        fields = ['team_1', 'team_2', 'winner', 'date', 'week', 'team_1_logo', 'team_2_logo']
class UserPicksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserPicks
        fields = ['user', 'week', 'team', 'point_awarded']

class DjangoUsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'email']

class DjangoUserWithTokenSerializer(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, vaildate_data):
        password = vaildate_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    class Meta:
        model = User
        fields = ['token', 'username', 'password']


