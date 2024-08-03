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