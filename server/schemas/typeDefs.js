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
        password: String
        business: Business
    }
`
module.exports = typeDefs;