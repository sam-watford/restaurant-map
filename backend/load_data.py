import requests

def get_image_url(photo_reference, api_key):
    """
    Constructs a URL for a photo using the Google Places API.
    """
    base_url = "https://maps.googleapis.com/maps/api/place/photo"
    params = {
        'maxwidth': 400,  # You can adjust the size as needed
        'photoreference': photo_reference,
        'key': api_key
    }
    return f"{base_url}?{'&'.join([f'{key}={value}' for key, value in params.items()])}"

def clear_restaurants(api_url):
    """
    Fetches all restaurants and deletes each one by ID.
    """
    # Fetch the list of all restaurants
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

def get_restaurants_near_location(api_key, location, radius=5000, keyword='restaurant', api_url=None):
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
        'key': api_key
    }

    while True:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json().get('results', [])
            for place in results:
                photo_reference = place.get('photos', [{}])[0].get('photo_reference', None)
                image_url = get_image_url(photo_reference, api_key) if photo_reference else None

                # Prepare data for POST request
                restaurant_data = {
                    'name': place.get('name'),
                    'rating': place.get('rating'),
                    'latitude': place['geometry']['location']['lat'],
                    'longitude': place['geometry']['location']['lng'],
                    'address': place.get('vicinity'),
                    'image_url': image_url
                }

                # Send POST request to the Django backend
                if api_url:
                    post_response = requests.post(api_url, json=restaurant_data)
                    if post_response.status_code == 201:
                        print(f"Added new restaurant: {restaurant_data['name']}")
                    else:
                        print(f"Failed to add restaurant: {restaurant_data['name']}")
                        print(f"Response: {post_response.content}")
                else:
                    print("API URL not provided. Skipping POST request.")

            next_page_token = response.json().get('next_page_token')

            if next_page_token:
                params['pagetoken'] = next_page_token
            else:
                break  # No more pages to fetch
        else:
            print(f"Error: {response.status_code}")
            break

if __name__ == "__main__":
    api_key = 'AIzaSyAxPBifWS4_-oJ4ZjoSO7h5A9n4b-k1AG0'
    location = '32.7512509,-97.341287'
    api_url = 'http://localhost:8000/api/restaurants/'

    # Clear existing restaurants
    clear_restaurants(api_url)

    # Fetch and add new restaurants
    get_restaurants_near_location(api_key, location, api_url=api_url)
