from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    rating = models.FloatField(default=0)
    address = models.CharField(max_length=255, null=True, blank=True)
    image_url = models.URLField(max_length=500, null=True, blank=True)
    image = models.ImageField(upload_to='restaurant_images/', null=True, blank=True)

    def __str__(self):
        return self.name
