from django.core.management.base import BaseCommand
from nfl.models import UserMadePick, UserPicks, NFLGame

class Command(BaseCommand):
    
    def add_arguments(self, parser):
        parser.add_argument('week_int', type=int)

    def handle(self, *args, **options):
        #exclude id 1 because that is the admin profile for testing
        all_user_picks_qs = UserPicks.objects.all().exclude(user__id=1)
        for user_pick in all_user_picks_qs:
            current_pick_qs = UserMadePick.objects.get(user=user_pick.user.id, week=options['week_int'])
            current_game_qs = user_pick.games.get(week=options['week_int'])
            print(current_game_qs, current_pick_qs)
            if current_pick_qs.been_checked:
                print('this users game pick has already been calculated')
            elif current_game_qs.winner == current_pick_qs.team:
                user_pick.points_awarded = user_pick.points_awarded + 1
                user_pick.save()
                print('we have a winner!')
            
            current_pick_qs.been_checked = True
            current_pick_qs.save()