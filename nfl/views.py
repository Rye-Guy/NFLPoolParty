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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NFLGameViewSet(viewsets.ModelViewSet):
    queryset = NFLGame.objects.all()
    serializer_class = GamesSerializer
    
class UserPicksViewSet(viewsets.ModelViewSet):
    queryset = UserPicks.objects.all()
    serializer_class = UserPicksSerializer

class DjangoUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = DjangoUsersSerializer


# Create your views here.
