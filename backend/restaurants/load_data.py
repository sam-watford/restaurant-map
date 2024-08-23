import requests

def get_photo_url(photo_reference, api_key):
    """
    Constructs a URL for a photo using the Google Places API.

    :param photo_reference: The photo reference returned by the Places API.
    :param api_key: Your Google Maps API key.
    :return: The URL for the photo.
    """
    base_url = "https://maps.googleapis.com/maps/api/place/photo"
    params = {
        'maxwidth': 400,  # You can adjust the size as needed
        'photoreference': photo_reference,
        'key': api_key
    }
    return f"{base_url}?{'&'.join([f'{key}={value}' for key, value in params.items()])}"

def get_restaurants_near_location(api_key, location, radius=2000, keyword='restaurant'):
    """
    Fetches restaurants near a specific location using Google Maps Places API.

    :param api_key: Your Google Maps API key.
    :param location: The location around which to search, given as 'latitude,longitude'.
    :param radius: The radius within which to search (in meters).
    :param keyword: The type of place to search for. Default is 'restaurant'.
    :return: A list of dictionaries containing restaurant information.
    """
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        'location': location,
        'radius': radius,
        'type': 'restaurant',
        'keyword': keyword,
        'key': api_key
    }

    restaurants = []
    while True:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json().get('results', [])
            for place in results:
                photo_reference = place.get('photos', [{}])[0].get('photo_reference', None)
                photo_url = get_photo_url(photo_reference, api_key) if photo_reference else None

                restaurant = {
                    'name': place.get('name'),
                    'rating': place.get('rating'),
                    'latitude': place['geometry']['location']['lat'],
                    'longitude': place['geometry']['location']['lng'],
                    'address': place.get('vicinity'),
                    'photo_url': photo_url
                }
                restaurants.append(restaurant)

            next_page_token = response.json().get('next_page_token')

            if next_page_token:
                params['pagetoken'] = next_page_token
            else:
                break  # No more pages to fetch
        else:
            print(f"Error: {response.status_code}")
            break

    return restaurants

# Example usage
if __name__ == "__main__":
    api_key = 'AIzaSyAxPBifWS4_-oJ4ZjoSO7h5A9n4b-k1AG0'
    location = '32.7512509,-97.341287'

    restaurants = get_restaurants_near_location(api_key, location)

    for i, restaurant in enumerate(restaurants, 1):
        print(f"{i}. Name: {restaurant['name']}")
        print(f"   Rating: {restaurant['rating']}")
        print(f"   Address: {restaurant['address']}")
        print(f"   Location: ({restaurant['latitude']}, {restaurant['longitude']})")
        if restaurant['photo_url']:
            print(f"   Photo URL: {restaurant['photo_url']}")
        else:
            print("   No photo available")
        print()
