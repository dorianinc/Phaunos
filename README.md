# <img src="/react-app/public/images/logo.png" width="60" height="70"> Phaunos

Phaunos is a fullstack single-page AllTrails clone where a user can find hiking trails in their area, add those trails to a list and leave reviews describing their experiences.

**Live Site: [Phaunos](https://phaunos.onrender.com/)**

#### Please see below links to project Wiki:
* [Feature List](https://github.com/dorianinc/Phaunos/wiki/Features-List)
* [Database Schema](https://github.com/dorianinc/01-AirBnB/wiki/Database-Schema)
* [Frontend Routes](https://github.com/dorianinc/Xenios/wiki/Front-End-Routes)
* [Backend Routes](https://github.com/dorianinc/01-AirBnB/wiki/Back-End-Routes)
* [Redux Store State Shape](https://github.com/dorianinc/01-AirBnB/wiki/Redux-Store-Shape)

## 💻 Tech Stack
#### Frameworks, Platforms and Libraries:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

#### Database:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

#### Hosting:
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

#### How to start project locally:
1. Clone the repo into a desired location
2. In the root folder run the following command to install dependencies for the backend (app folder) 
      ```bash
      pipenv install -r requirements.txt
      ```

3. In the root directory create a '.env' file
4. Copy over all the content from the 'example.env' to the '.env'
6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```
   
   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. cd into the 'react-app' folder run the following command to install dependencies for the frontend (react-app folder)
      ```bash
      npm install
      ```
 
7. In the 'react-app' folder create a '.env' file
8. Copy over all the content from the 'example.env' to the '.env'
9. From here you will need to get a key from [openweatherapi](https://openweathermap.org/api) and [googlemaps](https://console.cloud.google.com/google/maps-apis)
10. Take those keys and add them to the .env file


## Landing Page
You can access the Login and Signup page here. Also, we have a demo user button for you to access the website.

<kbd>
<img src="https://dorian-macias-portfolio.onrender.com/images/pic01.jpg">
</kbd>



