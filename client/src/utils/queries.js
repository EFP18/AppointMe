import { gql } from '@apollo/client';

// retrieves all current user data--including saved books
export const GET_BUSINESS = gql`
    query GET_BUSINESS {
    business {
        name
        email
        description
        address
        phone
        image
        logo
        services {
            _id
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
}`

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
            _id
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
query Vendor {
  vendor {
    _id
    business {
      _id
      name
      description
      logo
      image
      address
      phone
      email
      socialMedia {
        facebook
        instagram
        youTube
        tikTok
        linkedIn
      }
      services {
        _id
        name
        description
        price
      }
      tags {
        _id
        name
      }
    }
    email
    firstName
    lastName
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
