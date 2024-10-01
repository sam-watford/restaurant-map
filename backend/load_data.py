import requests
import argparse
import time

API_URL = 'http://backend:8000/api/restaurants/'
DEFAULT_RADIUS = 4000  # Default radius in meters
API_KEY = ''
LOCATION = '32.7512509,-97.341287'

def get_image_url(photo_reference):
    """
    Constructs a URL for a photo using the Google Places API.
    """
    base_url = "https://maps.googleapis.com/maps/api/place/photo"
    params = {
        'maxwidth': 600,
        'photoreference': photo_reference,
        'key': API_KEY
    }
    return f"{base_url}?{'&'.join([f'{key}={value}' for key, value in params.items()])}"

def clear_restaurants(api_url):
    """
    Fetches all restaurants and deletes each one by ID.
    """
    response = requests.get(api_url)
    if response.status_code == 200:
        restaurants = response.json()
        for restaurant in restaurants:
            restaurant_id = restaurant['id']
            delete_response = requests.delete(f"{api_url}{restaurant_id}/")
            if delete_response.status_code == 204:
                print(f"Successfully deleted restaurant with ID: {restaurant_id}")
            else:
                print(f"Failed to delete restaurant with ID: {restaurant_id}")
                print(f"Response: {delete_response.content}")
    else:
        print(f"Failed to fetch restaurants. Response: {response.content}")

def get_restaurants_near_location(location, radius, keyword=''):
    """
    Fetches restaurants near a specific location using Google Maps Places API
    and sends them to the Django backend via API POST requests.
    """
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        'location': location,
        'radius': radius,
        'type': 'restaurant',
        'keyword': keyword,
        'key': API_KEY
    }

    while True:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json().get('results', [])
            if not results:
                print("No more results found.")
                break

            for place in results:
                photo_reference = place.get('photos', [{}])[0].get('photo_reference', None)
                image_url = get_image_url(photo_reference) if photo_reference else None

                restaurant_data = {
                    'name': place.get('name'),
                    'rating': place.get('rating'),
                    'latitude': place['geometry']['location']['lat'],
                    'longitude': place['geometry']['location']['lng'],
                    'address': place.get('vicinity'),
                    'image_url': image_url
                }

                post_response = requests.post(API_URL, json=restaurant_data)
                if post_response.status_code == 201:
                    print(f"Added new restaurant: {restaurant_data['name']}")
                else:
                    print(f"Failed to add restaurant: {restaurant_data['name']}")
                    print(f"Response: {post_response.content}")

            next_page_token = response.json().get('next_page_token')
            if next_page_token:
                print("Fetching next page...")
                time.sleep(2)
                params['pagetoken'] = next_page_token
            else:
                break
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.content}")
            break

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Fetch and add restaurants to the database.')
    parser.add_argument('--radius', type=int, default=DEFAULT_RADIUS, help='Search radius in meters')

    args = parser.parse_args()

    clear_restaurants(API_URL)

    get_restaurants_near_location(LOCATION, radius=args.radius)
