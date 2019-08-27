from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from .models import NFLGame, UserPicks
from .serializers import GamesSerializer, UserPicksSerializer, DjangoUsersSerializer, DjangoUserWithTokenSerializer
from rest_framework import routers, viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

@api_view(['GET'])    
def current_user(request):
    serializer = DjangoUsersSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = DjangoUserWithTokenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            #CREATE A USER, GRAB THE INSTANCE OF THE USER FROM MODEL CLASS, SET THEM UP WITH A PICK SO THEY CAN PLAY THE GAME.
            user_instance = User.objects.get(username=request.data['username'])
            UserPicks.objects.create(user=user_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NFLGameViewSet(viewsets.ViewSet):
    
    def list(self, request, week):
        queryset = NFLGame.objects.all().filter(week=week)
        serializer = GamesSerializer(queryset, many=True)
        return Response(serializer.data)



@api_view(['GET', 'PATCH'])    
def current_user_picks(request):
    serializer = UserPicksSerializer(UserPicks.objects.get(user=request.user)) 
    return Response(serializer.data)

class UserPicksViewSet(viewsets.ModelViewSet):
    queryset = UserPicks.objects.all()
    serializer_class = UserPicksSerializer

class DjangoUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = DjangoUsersSerializer


# Create your views here.
