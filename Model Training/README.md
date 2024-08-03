# Model training
This directory contains the scripts to train our image classification models on the combined dataset ([30VNFoods](https://www.kaggle.com/datasets/quandang/vietnamese-foods) with our [Vietnamese food images dataset crawled on Google Images and ShopeeFood](https://www.kaggle.com/datasets/hoangviettung/custom-food-dataset)).

## Getting Started

### Prerequisites

Ensure you have Python 3.8+ installed on your system. You'll also need to install the required packages. You can do this by running:

```bash
pip install -r requirements.txt
```
### About training procedure
The training process of all the scripts were executed on [Kaggle](kaggle.com), where we could use free GPUs to train our image classification models with no cost, which helped a lot during the process of making this project!
## Script Detail
### gg-img-crawler.py 
Contains script to crawl all the images on a single Google Images page for a specified keyword.
### shopee-img-crawler.py
Contains script to crawl all the images of a food-name keyword that appear on [ShopeeFood](shopeefood.vn) on the specified cities.
### dedup-imgs.py
Contains helper sript to dedup identical images in a single directory using imagehash.
