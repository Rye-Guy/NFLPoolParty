from django.core.management.base import BaseCommand
from nfl.models import UserMadePick, UserPicks, NFLGame

class Command(BaseCommand):
    
    def add_arguments(self, parser):
        parser.add_argument('week_int', type=int)

    def handle(self, *args, **options):
        all_user_picks_qs = UserPicks.objects.all()
        for user_pick in all_user_picks_qs:
            current_game_qs = user_pick.games.get(week=options['week_int'])
            current_pick_qs = UserMadePick.objects.get(user=user_pick.user, week=options['week_int'])
            if current_pick_qs.been_checked:
                print('this users game pick has already been calculated')
            elif current_game_qs.winner == current_pick_qs.team:
                current_pick_qs.been_checked = True
                current_pick_qs.save()
                user_pick.points_awarded = user_pick.points_awarded + 1
                user_pick.save()
                print('we have a winner!')