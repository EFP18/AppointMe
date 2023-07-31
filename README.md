# AppointMe

CRM for freelancers

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
