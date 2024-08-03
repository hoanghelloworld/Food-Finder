<<<<<<< HEAD
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import undetected_chromedriver as uc
from selenium import webdriver
import pandas as pd
from urllib.parse import quote
from geopy.geocoders import Nominatim
import tqdm

driver_path = 'chromedriver.exe'
options = webdriver.ChromeOptions()
options.add_argument('--user-data-dir=C:/Users/natsu/AppData/Local/Google/Chrome/User Data/Default')
options.add_argument("--disable-notifications")
options.add_argument('--headless')

driver = uc.Chrome(executable_path=driver_path, options=options)

classes = [
    # Classes list as before
]

query_template = 'https://shopeefood.vn/{}/danh-sach-dia-diem-giao-tan-noi?q={}'

def get_restaurant_urls(food_name, city='ha-noi'):
    img_urls = []
    food_name = food_name.replace(' ', '%20')
    url = query_template.format(city, food_name)
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//div[@class='item-restaurant']")))

    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//div[@class='item-restaurant']")))
        items = driver.find_elements(By.XPATH, "//div[@class='item-restaurant']")

        for item in items:
            img = item.find_element(By.XPATH, ".//a")
            img_urls.append(img.get_attribute('href'))
        
        try:
            next_btn = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, "//ul[@class='pagination']/li[last()]")))
            if "disabled" in next_btn.get_attribute('class'):
                break
            next_btn.click()
        except TimeoutException:
            break

    return img_urls

def get_score(driver):
    try:
        stars = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//div[@class='stars']")))
        spans = stars.find_elements(By.TAG_NAME, 'span')
        full_stars = sum(1 for span in spans if 'full' in span.get_attribute("class").split())
        half_stars = sum(1 for span in spans if 'half' in span.get_attribute("class").split())
        return full_stars + (half_stars * 0.5)
    except TimeoutException:
        return None

def place_info(address):
    geolocator = Nominatim(user_agent="myapp")
    location = geolocator.geocode(address)
    if location:
        return location.raw['place_id'], location.raw['lat'], location.raw['lon']
    return None, None, None

def get_url(query):
    return f'https://www.google.com/maps/dir/?api=1&destination={quote(query)}'

def get_info(url, driver, label):
    driver.get(url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//h1[@class='name-restaurant']")))
    title = driver.find_element(By.XPATH, "//h1[@class='name-restaurant']").text
    address = driver.find_element(By.XPATH, "//div[@class='address-restaurant']").text
    imageUrl = None
    try:
        imageUrl = driver.find_element(By.XPATH, f"//img[@alt='{title}']").get_attribute('src')
    except NoSuchElementException:
        pass
    placeId, latitude, longitude = place_info(address)
    score = get_score(driver)
    url = get_url(address)

    return {
        "address": address,
        "location/lat": latitude,
        "location/lng": longitude,
        "imageUrls/0": imageUrl,
        "placeId": placeId,
        "searchString": label,
        "title": title,
        "totalScore": score,
        "url": url
    }

columns = ["address", "location/lat", "location/lng", "imageUrls/0" , "placeId", "searchString", "title" , "totalScore" , "url"]
data = []

for label in tqdm.tqdm(classes):
    urls = get_restaurant_urls(label)
    for url in urls:
        info = get_info(url, driver, label)
        if info:
            data.append(info)

df = pd.DataFrame(data, columns=columns)
df.to_csv('shopee-restaurant-info.csv', index=False)
=======
import undetected_chromedriver as uc
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import requests
import os
import tqdm

driver_path = 'chromedriver.exe'

options = webdriver.ChromeOptions()

options.add_argument('--user-data-dir=path/to/Google/Chrome/User Data/Default')
options.add_argument('--headless')
options.add_argument("--disable-notifications")
options.add_argument("window-size=1920,1080")

driver = uc.Chrome(executable_path=driver_path, options=options)

city_queries = ['ha-noi', 'hai-phong']
food_names = ['Bún cá cay', 'Bánh đa cua', 'Nem nướng']

query_template = 'https://shopeefood.vn/{}/danh-sach-dia-diem-giao-tan-noi?q={}'


def get_img_urls(food_name, city='ha-noi'):
    img_urls = []
    food_name = food_name.replace(' ', '%20')
    
    url = query_template.format(city, food_name)
    driver.get(url)
    time.sleep(10) # Wait for browser to load

    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        items = driver.find_elements(By.XPATH, "//div[@class='item-restaurant']")

        for item in items:
            img = item.find_element(By.XPATH, ".//img")
            img_urls.append(img.get_attribute('src'))
        
        next_btn = driver.find_element(By.XPATH, "//ul[@class='pagination']").children()[-1]

        if next_btn.get_attribute('class') == 'disabled':
            break
        next_btn.click()
        time.sleep(5)

    return img_urls


def download_imgs(img_urls, folder_path):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    for i, url in tqdm.tqdm(enumerate(img_urls), total=len(img_urls), desc="Downloading images..."):
        try:
            response = requests.get(url, headers=headers, stream=True)
            response.raise_for_status()  # Check for HTTP request errors

            # Construct the file path
            file_path = os.path.join(folder_path, f"{i}.jpg")

            # Open the file in binary write mode and save the content
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=128):
                    f.write(chunk)
        except Exception as e:
            print(f"Error downloading image: {e}")
            print(f"URL: {url}")


for food_name in food_names:
    img_urls = []
    for city in city_queries:
        img_urls.extend(get_img_urls(food_name, city))
    folder_path = f'FOOD-DATASET/{food_name}'
    download_imgs(img_urls, folder_path)


driver.quit()
>>>>>>> a60d5a2d419f4b8df4c915a92414abebb0d656b2
