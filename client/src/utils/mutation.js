import { gql } from '@apollo/client';

// add new user via email and password
export const ADD_VENDOR = gql`
  mutation ADD_VENDOR($email: String!, $password: String!) {
    addVendor(email: $email, password: $password) {
      token
      vendor {
        email
      }
    }
  }
`;

export const LOGIN_VENDOR = gql`
  mutation loginVendor($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      vendor {
        _id
        email
      }
    }
  }
`;

// update vendor info
export const UPD_VENDOR = gql`
  mutation UPD_VENDOR(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updVendor(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      email
      firstName
      lastName
      business {
        name
      }
    }
  }
`;

// delete vendor
export const DEL_VENDOR = gql`
  mutation DEL_VENDOR($id: ID!) {
    delVendor(_id: $id) {
      _id
      email
    }
  }
`;

// create new business
export const ADD_BUSINESS = gql`
  mutation ADD_BUSINESS(
    $name: String!
    $description: String
    $logo: String
    $image: String
    $address: String
    $phone: String
    $email: String
  ) {
    addBusiness(
      name: $name
      description: $description
      logo: $logo
      image: $image
      address: $address
      phone: $phone
      email: $email
    ) {
      name
      description
      logo
      image
      address
      phone
      email
    }
  }
`;

// update current user's business
export const UPD_BUSINESS = gql`
  mutation UPD_BUSINESS(
    $name: String
    $description: String
    $logo: String
    $image: String
    $address: String
    $phone: String
    $email: String
  ) {
    updBusiness(
      name: $name
      description: $description
      logo: $logo
      image: $image
      address: $address
      phone: $phone
      email: $email
    ) {
      address
      email
      description
      image
      logo
      name
      phone
    }
  }
`;

// update current user's business
export const DEL_BUSINESS = gql`
  mutation DEL_BUSINESS {
    delBusiness {
      name
    }
  }
`;

// create new Tag; should only be used in back end
export const CREATE_TAG = gql`
  mutation CREATE_TAG($name: String) {
    createTag(name: $name) {
      name
    }
  }
`;

export const ADD_TAG = gql`
mutation ADD_TAG($id: ID!) {
  addTag(_id: $id) {
    name
    tags {
      _id
    }
  }
}
`;

// remove tag
export const RMV_TAG = gql`
  mutation RMV_TAG($id: ID!) {
    rmvTag(_id: $id) {
      name
      tags {
        _id
      }
    }
  }
`;

// add service
export const ADD_SERVICE = gql`
  mutation ADD_SERVICE($name: String!, $price: Float!, $description: String) {
    addService(name: $name, price: $price, description: $description) {
      name
      services {
        _id
      }
    }
  }
`;

// remove service
export const DEL_SERVICE = gql`
  mutation DelService($id: ID!) {
    DelService(_id: $id) {
      _id
    }
  }
`;

// update service
export const UPD_SERVICE = gql`
  mutation UPD_SERVICE(
    $id: ID!
    $name: String!
    $price: Float!
    $description: String
  ) {
    updService(
      _id: $id
      name: $name
      price: $price
      description: $description
    ) {
      _id
      name
      description
      price
    }
  }
`;

// add client
export const ADD_CLIENT = gql`
  mutation ADD_CLIENT(
    $firstName: String
    $lastName: String
    $email: String
    $address: String
    $phone: String
    $note: String
  ) {
    addClient(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      phone: $phone
      note: $note
    ) {
      firstName
      lastName
      email
      address
      phone
      note
    }
  }
`;

// del client
export const DEL_CLIENT = gql`
  mutation DEL_CLIENT($id: ID!) {
    delClient(_id: $id) {
      firstName
      lastName
    }
  }
`;

// update client
export const UPD_CLIENT = gql`
mutation UPD_CLIENT($id: ID!, $firstName: String, $lastName: String, $email: String, $address: String, $phone: String, $note: String) {
  updClient(_id: $id, firstName: $firstName, lastName: $lastName, email: $email, address: $address, phone: $phone, note: $note) {
    firstName
    lastName
    note
  }
}
`;

// update social media
export const UPD_SOCIALMEDIA = gql`
  mutation UpdSocialMedia(
    $facebook: String
    $instagram: String
    $youTube: String
    $tikTok: String
    $linkedIn: String
  ) {
    updSocialMedia(
      facebook: $facebook
      instagram: $instagram
      youTube: $youTube
      tikTok: $tikTok
      linkedIn: $linkedIn
    ) {
      name
      socialMedia {
        facebook
        instagram
        linkedIn
        tikTok
        youTube
      }
    }
  }
`;

export const MANAGE_SERVICES = gql`
  mutation MANAGE_SERVICES($servicesArr: [subService]) {
    manageServices(servicesArr: $servicesArr) {
      message
    }
  }
`;

