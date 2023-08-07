const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Business {
        _id: ID
        name: String
        description: String
        logo: String
        image: String
        address: String
        phone: String
        email: String
        socialMedia: SocialMedia
        tags: Tag
        services: [Service]
        clients: [Client]
    }

    type Client {
        _id: ID
        firstName: String
        lastName: String
        email: String
        address: String
        phone: String
        note: String
        previousShopping: [Business]
    }

    type Service {
        _id: ID
        name: String!
        description: String
        price: Float!
    }

    type SocialMedia {
        facebook: String
        instagram: String
        youTube: String
        tikTok: String
        linkedIn: String
    }

    type Tag {
        _id: ID
        name: String
    }

    type Vendor {
        _id: ID
        firstName: String
        lastName: String
        email: String
        business: Business
    }

    type Auth {
        token: ID!
        vendor: Vendor
    }

    type Ok {
        message: String
    }

    input Data {
            _id: String!
            name: String!
            price: Float!
            description: String!
        }

    input subService {
        type: String
        data: Data
    }

    type Query {
        vendor: Vendor
        business: Business
        businesses: [Business]
        businessCV (_id: ID): Business
        client (_id: ID!): Client
        clients: [Client]
        tags: [Tag]
    }
    

    type Mutation {
        addVendor (email: String!, password: String!): Auth
        delVendor (_id: ID!): Vendor
        updVendor (firstName: String, lastName: String, email: String, password: String): Vendor
        addBusiness (name: String, description: String, logo: String, image: String, address: String, phone: String, email: String): Business
        delBusiness: Business
        updBusiness (name: String, description: String, logo: String, image: String, address: String, phone: String, email: String): Business
        createTag (name: String): Tag
        addTag (_id: ID!): Business
        rmvTag (_id: ID!): Business
        addService (name: String!, description: String, price: Float!): Service
        DelService (_id: ID!): Service
        updService (_id: ID!, name: String!, description: String, price: Float!): Service
        manageServices(servicesArr: [subService]): Ok
        addClient (firstName: String, lastName: String, email: String, address: String, phone: String, note: String): Client
        delClient (_id: ID!): Client
        updClient (_id: ID!, firstName: String, lastName: String, email: String, address: String, phone: String, note: String): Client
        updSocialMedia(facebook: String, instagram: String, youTube: String, tikTok: String, linkedIn: String): Business
        login (email: String!, password: String!): Auth
    }
`
module.exports = typeDefs;