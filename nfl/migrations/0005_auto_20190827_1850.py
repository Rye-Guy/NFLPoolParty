# Generated by Django 2.2.4 on 2019-08-27 18:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nfl', '0004_auto_20190827_1836'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userpicks',
            old_name='team',
            new_name='teams',
        ),
    ]
