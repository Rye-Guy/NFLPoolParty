# Generated by Django 2.2.4 on 2019-09-02 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nfl', '0009_auto_20190902_2107'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermadepick',
            name='been_checked',
            field=models.BooleanField(null=True),
        ),
    ]
