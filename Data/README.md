# Preparing dataset for model training
This directory contains the scripts necessary for crawling food images from Google, ShopeeFood to train the image classification model for the Food Finder project. 


## Getting Started

### Prerequisites

Ensure you have Python 3.8+ installed on your system. You'll also need to install the required packages. You can do this by running:

```bash
pip install -r requirements.txt
```
### Running the crawler
Make sure you have chromedriver.exe that running the same version as your Chrome browser installed in the same directory. Google changes its source code every now and then so adjust the correct parameters as mentioned in the script.
## Script Detail
### gg-img-crawler.py 
Contains script to crawl all the images on a single Google Images page for a specified keyword.
### shopee-img-crawler.py
Contains script to crawl all the images of a food-name keyword that appear on [ShopeeFood](shopeefood.vn) on the specified cities.
### dedup-imgs.py
Contains helper sript to dedup identical images in a single directory using imagehash.
