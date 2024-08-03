import undetected_chromedriver as uc
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException, ElementNotInteractableException
import time
import requests
import os
import tqdm

driver_path = 'chromedriver.exe'
folder_path = 'FOOD-DATASET/food-name'

options = webdriver.ChromeOptions()


options.add_argument('--user-data-dir=path/to/Google/Chrome/User Data/Default')
options.add_argument('--headless')
driver = uc.Chrome(executable_path=driver_path, options=options)
driver.minimize_window()

# Google image url for keyword
url = 'Google image url for food-name'

driver.get(url)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(30)

img_class = 'YQ4gaf' # GG Images' images' class (Find the class that you always see when inspecting images)
img_jsname = 'kn3ccd' # GG Images' images' js name

img_results = driver.find_elements(By.XPATH, f"//img[contains(@id, 'dimg') and @class='{img_class}']")

img_urls = []
for img in tqdm.tqdm(img_results, total=len(img_results), desc="Extracting image URLs..."):
    try:
        img.click()
        time.sleep(4)

        detailed_img = driver.find_element(By.XPATH, f"//img[@jsname='{img_jsname}']")

        if detailed_img.get_attribute('src'):
            img_urls.append(detailed_img.get_attribute('src'))

        close_btns = driver.find_elements(By.XPATH, "//div[@class='vbgB1c']")
        for close_btn in close_btns:
            try:
                close_btn.click()
                break
            except ElementNotInteractableException:
                continue
    except (NoSuchElementException, StaleElementReferenceException) as e:
        print(f"Error finding detailed image: {e}")
    finally:
        # Ensure the driver waits or navigates correctly before the next iteration
        time.sleep(1)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

print("Total images found: ", len(img_urls))
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

driver.quit()
