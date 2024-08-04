<div align="center">

  <img src="assets/logo.png" alt="logo" width="200" height="auto" />
  <h1>Food Finder</h1>
  
  <p>
  </p>
Demo App : https://foodfinderai-a61adf03833a.herokuapp.com/
<p>
This is demo app.

<!-- Badges -->
<p>
  <a href="https://github.com/hoanghelloworld/Food-Finder/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/hoanghelloworld/Food-Finder" alt="contributors" />
  </a>
  <a href="https://img.shields.io/github/last-commit/hoanghelloworld/Food-Finder">
    <img src="https://img.shields.io/github/last-commit/hoanghelloworld/Food-Finder" alt="last update" />
  </a>
  <a href="https://github.com/hoanghelloworld/Food-Finder/network/members">
    <img src="https://img.shields.io/github/forks/hoanghelloworld/Food-Finder" alt="forks" />
  </a>
  <a href="https://github.com/hoanghelloworld/Food-Finder/stargazers">
    <img src="https://img.shields.io/github/stars/hoanghelloworld/Food-Finder" alt="stars" />
  </a>
  <a href="https://github.com/hoanghelloworld/Food-Finder/issues/">
    <img src="https://img.shields.io/github/issues/hoanghelloworld/Food-Finder" alt="open issues" />
  </a>
  <a href="https://github.com/hoanghelloworld/Food-Finder/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/hoanghelloworld/Food-Finder.svg" alt="license" />
  </a>
</p>
   
<h4>
    <a href="https://drive.google.com/file/d/12TNA7xeSw3fuzKXwHYkH50rvptbiUShZ/view?usp=drive_link">View Demo</a>
  <span> · </span>
    <a href="https://drive.google.com/file/d/1bPu_aIvzJ_LO1Dn77H8vCEGfSRLKS6Fa/view?usp=drive_link">Documentation</a>
  <span> · </span>
    <a href="https://github.com/hoanghelloworld/Food-Finder/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/hoanghelloworld/Food-Finder/issues/">Request Feature</a>
</h4>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [:notebook\_with\_decorative\_cover: Table of Contents](#notebook_with_decorative_cover-table-of-contents)
  - [:star2: About the Project](#star2-about-the-project)
    - [:camera: Screenshots](#camera-screenshots)
    - [:space\_invader: Tech Stack](#space_invader-tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
    - [:dart: Features](#dart-features)
    - [:collision: The Necessity of the Topic](#collision-the-necessity-of-the-topic)
    - [:point\_right: Research Objectives](#point_right-research-objectives)
    - [:art: Color Reference](#art-color-reference)
  - [:compass: Roadmap](#compass-roadmap)
  - [:wave: Contributing](#wave-contributing)
- [](#)
    - [:scroll: Code of Conduct](#scroll-code-of-conduct)
  - [:grey\_question: FAQ](#grey_question-faq)
  - [:warning: License](#warning-license)
  - [:handshake: Contact](#handshake-contact)
  - [:gem: Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->
## :star2: About the Project

### Purpose
Explore and discover more information about Vietnamese cuisine and dishes. FoodFinder is an application that uses AI technology to identify dishes from user-provided images or input. It helps users save time and effort in searching for information about dishes and dining places, while also reducing the effort needed to compare restaurants.

### Benefits
- **Food Identification**: Identify dishes from images using AI, helping users quickly and accurately determine what the dish is.
- **Information Provision**: Provide detailed information about dishes, including ingredients, preparation methods, and dish characteristics, so users can better understand the dishes they are interested in.
- **Restaurant Finder**: Suggest nearby restaurants or eateries where users can enjoy their favorite dishes or try new ones.
- **Reviews and Ratings**: Allow users to read and write reviews about dishes and restaurants, improving decision-making.

### Overview Design
FoodFinder is an intelligent mobile application that helps users explore and learn about Vietnamese cuisine. The application uses AI technology to identify dishes from user-provided images or input. FoodFinder analyzes the images to determine the dish and provides detailed information about ingredients, preparation methods, and dish characteristics. Additionally, the application suggests nearby restaurants or eateries where users can enjoy their favorite dishes or try new ones.

### AI Integration
1. **Image Recognition**: 
   - The product uses deep learning models to analyze and identify dishes from user-provided images. This process includes extracting image features, comparing with a food database, and accurately identifying the dish.
2. **Natural Language Processing (NLP)**: 
   - The product applies NLP to understand and respond to user queries or requests related to dish information, ingredients, preparation methods, and restaurant reviews. This helps provide information in a natural and intuitive manner.
3. **Smart Recommendations**: 
   - AI analyzes user habits and preferences to suggest new dishes or suitable restaurants. The system learns from user data to improve accuracy and personalize recommendations over time.

### Implementation Plan
1. **Data Collection**
   - **Data Sources**: Use the "30VNFoods" dataset from Kaggle and additional data from reputable food platforms for Vietnamese cuisine.
   - **Data Processing**: Clean and process the data to ensure each entry has appropriate labels.
2. **AI Model Development**
   - **Image Recognition**:
     - Use deep learning models like Convolutional Neural Networks (CNN) to analyze and identify dishes from images.
     - Frameworks: TensorFlow, Keras, PyTorch.
   - **Natural Language Processing**:
     - Use NLP models to understand and respond to user questions about dishes.
     - Frameworks: NLTK, spaCy, BERT.
3. **Model Building**
   - **Data Preparation**:
     - Preprocess image data, including cropping, rotating, and normalizing.
     - Split data into training, testing, and validation sets.
   - **Model Training**:
     - Use TensorFlow or PyTorch to build CNN models.
     - Train the model on prepared data and optimize hyperparameters for best performance.
   - **Model Evaluation**:
     - Use metrics like accuracy, precision, recall, and F1-score to measure model performance.
     - Adjust and improve the model based on evaluation results.
4. **Google Map API Integration**
   - **User Location Identification**:
     - Use Google Map API to get the user's current location.
   - **Place Search**:
     - Use Google Places API to find nearby restaurants or eateries offering the identified dish.
5. **Web Interface Development**
   - **User Interface**:
     - Design UI/UX for the website to allow users to upload dish images, view information, and receive location suggestions.
     - Use HTML, CSS, and JavaScript for development.
   - **Front-end Frameworks**:
     - Use React.js to develop a dynamic and interactive user interface.
   - **API Integration**:
     - Integrate developed APIs into the website to provide dish identification and location search features.
6. **Testing**
   - Perform unit testing, integration testing, and system testing to ensure website quality.
7. **Maintenance and Improvement**
   - Continuously update and improve AI models based on user feedback and new data.
   - Develop new features, such as restaurant reviews and personalized dish recommendations based on user history.

### Plus Points
- **Advanced AI Technology**: Continuous improvement in accuracy.
- **Compact and User-Friendly Design**: Easy to use.
- **Multilingual Support**: Customizable alerts in the user's language.
- **Mobile Device Integration**: Compatible with existing mobile devices without special requirements.

### Unique Features
- **AI Image Recognition**: Quickly and accurately identify dishes from images using deep learning models.
- **Detailed Information Provision**: Provide information on ingredients, preparation methods, and dish characteristics.
- **Restaurant Suggestions**: Suggest nearby restaurants using Google Places API.
- **Reviews and Ratings**: Allow users to read and write reviews about dishes and restaurants.

### Innovations
- **Combining AI and NLP**: Apply AI and NLP to respond to dish-related queries.
- **Smart Recommendations**: Analyze user habits and preferences to offer personalized suggestions.

### Superior Advantages
- **Focus on Vietnamese Cuisine**: Specialized in exploring and promoting Vietnamese cuisine.
- **Comprehensive Ecosystem**: Provide a complete solution from dish identification to restaurant suggestions and reviews.
- **Continuous Improvement**: Regular updates and improvements based on user feedback.

<!-- Screenshots -->
### :camera: Screenshots

<!-- TechStack -->
### :space_invader: Tech Stack

- **Client**: HTML, CSS, JavaScript
- **Server**: Node.js,

 Express.js
- **Database**: MongoDB

## Installation

<!-- Prerequisites -->
### Prerequisites

<!-- Steps -->
### Steps

## Usage

<!-- Features -->
### :dart: Features

- Image recognition and dish identification
- Information provision on dishes
- Nearby restaurant suggestions
- User reviews and ratings

<!-- Necessity of the Topic -->
### :collision: The Necessity of the Topic

Vietnamese cuisine is rich and diverse, with unique and delicious dishes that captivate tourists and food enthusiasts. However, not everyone is knowledgeable about Vietnamese dishes. Therefore, FoodFinder is created to help users better understand and explore Vietnamese cuisine through AI technology.

<!-- Research Objectives -->
### :point_right: Research Objectives

- **Image Recognition**: Identify dishes from user-provided images.
- **Information Provision**: Provide information on ingredients, preparation methods, and dish characteristics.
- **Restaurant Suggestions**: Suggest nearby restaurants offering the identified dish.

<!-- Color Reference -->
### :art: Color Reference

| Color             | Hex       |
| ----------------- | --------- |
| Primary Color     | #3498db   |
| Secondary Color   | #2ecc71   |
| Accent Color      | #f1c40f   |
| Text Color        | #333333   |
| Background Color  | #ffffff   |

## :compass: Roadmap

- [x] AI model for image recognition
- [x] Integration with Google Map API
- [x] Development of web interface
- [x] User reviews and ratings

## :wave: Contributing

Contributions are always welcome! Please follow the `code of conduct` below.

<!-- Code of Conduct -->
### :scroll: Code of Conduct

- Be respectful.
- Provide constructive feedback.
- Follow coding standards.

## :grey_question: FAQ

- **How to use FoodFinder?**
  - Upload an image of the dish, and FoodFinder will identify it and provide detailed information.
- **How does FoodFinder suggest restaurants?**
  - FoodFinder uses Google Places API to find nearby restaurants offering the identified dish.
- **Can users write reviews?**
  - Yes, users can read and write reviews about dishes and restaurants.

## :warning: License

Distributed under the MIT License. See LICENSE for more information.

## :handshake: Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - your_email@example.com

Project Link: [https://github.com/hoanghelloworld/Food-Finder](https://github.com/hoanghelloworld/Food-Finder)

## :gem: Acknowledgements

- Kaggle for the "30VNFoods" dataset
- Google for Google Maps and Places API
- TensorFlow, Keras, PyTorch for AI model development
```
