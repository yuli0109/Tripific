## Readme.md 

# Tripific

[![screenshot_home.jpg](https://s4.postimg.org/lk53wu31p/screenshot_home.jpg)](https://postimg.org/image/4wdluc8a1/)

https://tripific.herokuapp.com/

Tripific is a road trip planning application, designed to help you get the most 
out of your next road trip! By incorporating Google Maps and Yelp 
technologies, Tripific allows you to customize the waypoints you'd 
like to stop at throughout your trip. See more, do more, and drive less!

Additional Links:

Trello - https://trello.com/b/sUdF5Roq/project3-wdi

Presentation - https://docs.google.com/presentation/d/18YgAXaNqtX2f3b1WrL2OQwlgdgIPqU77tQl8ne4ojLY/edit#slide=id.p

Project 3 Team Members: 

    Mondale Felix
    Victoria Kurzweg
    Clarissa Bitar
    Berry Zhong

Approach to Project:
    
    As a team, we delegated tasks to individual members in 
    order to modularize work and produce code more efficiently.
    We attempted to follow the Agile Work Flow process, making many 
    small adjustments while maintaining flexibility and continuous evolution 
    throughout the development stage. We also attempted to follow RESTful 
    conventions while creating our application's routes.


| RESTful API Routes   | |
| --------|-----------| 
| GET   | /trips    |
| GET    | /trips/:tripId |
| POST   | /trips
| POST   | /trips/:tripId/stops  |
| POST   | /stops/:stopId/activities |
| DELETE | /trips/:id  |
| DELETE | /stops/:stopId  |
| DELETE | /activities/:activityId |


Technologies Used: 

    HTML5 & CSS3
    Javascript
    NodeJS
    Express
    Mongoose
    MongoDB
    jQuery
    Git
    GoogleMaps API
    Yelp API
    MomentJS
    Google OAuth
    Express-Session

[![screenshot_map.jpg](https://s13.postimg.org/ltfy83x2f/screenshot_map.jpg)](https://postimg.org/image/zacwqz7dv/)

User Instructions:

    1. Launch application using Heroku link above
    2. Sign up or log in through Google OAuthorization.
    3. Select origin and destination. Your desired route will be generated on a map.
    4. Click on the map to select waypoints along the trip's route. Your route will 
       automatically adjust.
    5. Click the hand icon, then click on a waypoint pin to filter Yelp categories 
       and find dining, shopping and recreation within 5 miles of the pin dropped.
    6. Add desired activities to your itinerary and save your trip.
    7. By selecting specific waypoints and choosing activities, you can customize your road trip
       and see the and do the most while traveling efficiently!     

Future Features:

    Addition of email confirmation of itinerary.
    Incorporation of more Yelp categories to search by.
    Possibly the addition of real-time group planning of road-trip.









