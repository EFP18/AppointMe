# AppointMe

CRM for freelancers

# AppointMe

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

![LandingPage](add screenshot here)

- Follow the link to access the live version of my Portfolio: `add link`

- GitHub repository: `https://github.com/EFP18/React-Portfolio`

  ### Installation

  install

  ### Usage

  usage

  ### License

  MIT

  ### Contributing

  contibution?

  ### Questions

  - GitHub: http://github.com/https://github.com/EFP18/AppointMe
  - Email: info@appointme.com

// utilty pattern: get email of logged in person
foobar: async(parent,args,context) => {
console.log(context.email) // get email of logged in person
return {user}
}

/\*
belongs in app.js
const client = new ApolloClient({
request:(operation) => {
// Prep settings
const token = localStorage.getItem('id_token'); // Auth.getToken

    // Actual Apollo settings for all requests
    operation.setContext({
      {headers:{authorization: token?`Bearer ${token}`:""}}
    })

},
url: "/graphql"

})
\*/
