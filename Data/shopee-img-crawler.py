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