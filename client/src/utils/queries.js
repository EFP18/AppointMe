import { gql } from '@apollo/client';

// retrieves all current user data--including saved books
export const GET_BUSINESS = gql`
  query GET_BUSINESS($id: ID!) {
    business(_id: $id) {
      name
      email
      description
      address
      phone
      image
      logo
      services {
        name
        description
        price
      }
      tags {
        name
      }
      socialMedia {
        facebook
        instagram
        linkedIn
        tikTok
        youTube
      }
      clients {
        firstName
        lastName
        email
        address
        phone
        note
      }
    }
  }
`;

export const GET_BUSINESSES = gql`
  query GET_BUSINESSES {
    businesses {
      name
      email
      description
      address
      phone
      image
      logo
      services {
        name
        description
        price
      }
      tags {
        name
      }
      socialMedia {
        facebook
        instagram
        linkedIn
        tikTok
        youTube
      }
      clients {
        firstName
        lastName
        email
        address
        phone
        note
      }
    }
  }
`;

export const GET_VENDOR = gql`
  query GET_VENDOR($id: ID!) {
    vendor(_id: $id) {
      firstName
      lastName
      email
      business {
        name
        description
        email
        address
        phone
        image
        logo
        services {
          name
          description
          price
        }
        socialMedia {
          youTube
          tikTok
          linkedIn
          instagram
          facebook
        }
        tags {
          name
        }
        clients {
          firstName
          lastName
          email
          address
          phone
          note
          _id
        }
      }
    }
  }
`;

export const GET_CLIENT = gql`
  query Query($id: ID!) {
    client(_id: $id) {
      firstName
      lastName
      email
      address
      phone
      note
    }
  }
`;

export const GET_CLIENTS = gql`
  query GET_CLIENTS {
    clients {
      firstName
      lastName
      email
      address
      phone
      note
    }
  }
`;

export const GET_TAGS = gql`
  query Query {
    tags {
      name
    }
  }
`;
