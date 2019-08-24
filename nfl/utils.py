from .serializers import DjangoUsersSerializer

def jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': DjangoUsersSerializer(user, context={'request': request}).data
    }