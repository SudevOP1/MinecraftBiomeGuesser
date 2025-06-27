from django.db import models

class Player(models.Model):
    username = models.CharField(max_length=50, primary_key=True)
    total_score = models.IntegerField(default=0)
    total_tests = models.IntegerField(default=0)

    def __str__(self):
        return self.username
