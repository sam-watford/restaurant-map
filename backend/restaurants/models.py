from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    rating = models.FloatField(default=0)

    def __str__(self):
        return self.name
