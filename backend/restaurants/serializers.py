from rest_framework import serializers
from .models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'rating', 'latitude', 'longitude', 'address', 'image_url', 'image']

    def validate(self, data):
        if not data.get('image_url') and not data.get('image'):
            raise serializers.ValidationError("Either 'image_url' or 'image' must be provided.")
        return data
