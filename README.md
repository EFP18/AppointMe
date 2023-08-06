# AppointMe

CRM for freelancers and booking service

![License](https://img.shields.io/badge/License-MIT.svg)

https://opensource.org/licenses/MIT

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

### Description

AppointMe is a platform for service providers and seekers. It targets freelancers who have their own business but don't have a website, and it gives them the chance to create a business profile, track their clients and their schedule, as well as get directly booked through the platform by people looking for their services.

- Landing page. Browse through the different industries to find the Vendor you'd like to book your appointment with.

![LandingPage](./client/src/images/landingpage.png)

- Edit Profile for vendors.

![EditProfile](./client/src/images/editProfileScreenshot.png)

- Vendor Profile view.

![ClientView](./client/src/images/viewProfileScreenshot.png)

- Book Appointment view.

![BookAppointment](./client/src/images/bookAppointment.png)

- Follow the link to access the live version of AppointMe: `add link`

- GitHub repository: `https://github.com/EFP18/AppointMe`

### Installation

Follow the steps below to install the application:

- Clone the repository in your local machine.
- Navigate to the cloned repository locally.
- Run `npm i` to install all necessary dependencies.
- Run `npm run seed` to populate the seeded categories.
- Run `npm run develop` to start the application.

Once your repository is compiled successfully, the website will load automatically on your browser.

This application is deployed using `Heroku`.

### Usage

This project is a `MERN` stack single-page application, that uses `React` for the front end. Additionally, it uses the following technologies:

- `GraphQL API`, `Node.js`, and `Express.js` server.
- The application uses `queries` and `mutations` for retrieving, adding, updating, and deleting data.
- `MongoDB` and `Mongoose ODM` for the database.
- `JWT` authentication.
- Component library: `Material UI`.

### License

MIT

### Contributing

- Drew Smith: `https://github.com/ds055`
- Thanh Doan: `https://github.com/teddysm`
- Ester Pelosof: `https://github.com/EFP18`
- Hunter Tran: `https://github.com/ShimmyShong`
- Daniel Mascali: `https://github.com/TurboTeam335`

### Questions

- GitHub: `https://github.com/EFP18/AppointMe`
- Email: `info@appointme.com`


<!-- PLACEHOLDERS -->
## User Story

```
AS A hungry person
I WANT to quickly search for good restaurants near me
SO THAT I can plan my meals
```

## Acceptance Criteria

```
GIVEN a map with a restaurant input
WHEN I search for a city
THEN I am presented autofilled options for available cities
WHEN I click on the city that I want
THEN I am presented with the restaurants nearby on the cards
WHEN I view map
THEN I am presented with the city I search for and red pins for recommended restaurants
WHEN I view the restaurant cards
THEN I am presented with the restaurant's name, phone number, price, rating and reviews
WHEN I click on a restaurant's phone number
THEN I can make a call to that restaurant
WHEN I click on a restaurant's address
THEN I am presented with the map zoom in at the restaurant's location
```

TODO:

1. book an appointment button adds client appointment to db --> Ted !!!!!!!!!!!!
2. client notes modal --> Drew
3. month view calendar can't open the event 2nd time --> Ted
4. add services!!!!!!! team work!!
5. upload images --> Hunter
6. readme --> team work
7. presentation : https://docs.google.com/presentation/d/1eKiCMBW5lZgPrqKxn2AehO71AmGxK-dtk1qi69G2_JU/edit#slide=id.p --> team work
8. responsive --> Daniel
9. calendar can't view on month
10. load error in landing page
11. booking redirect to thank you page
12. 
