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
        tags: [Tag]
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
        name: String
        description: String
        price: Float
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
        user: Vendor
    }

    type Query {
        vendor: Vendor
        business: Business
        businesses: [Business]
        client: Client
        clients: [Client]
        tags: [Tag]
    }

    type Mutation {
        addVendor (firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login (email: String!, password: String!): Auth
    }
`
module.exports = typeDefs;