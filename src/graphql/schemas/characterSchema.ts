import { buildSchema } from "graphql";

const Schema = buildSchema(`
  type Character {
    id: String!
    name: String!
    status: String!
    species: String!
    type: String!
    gender: String!
    origin: Origin
    location: Location
    image: String!
    episode: [String]
    url: String!
    created: String!
  }
  
  type Origin {
    name: String!
    url: String!
  }
  
  type Location {
    name: String!
    url: String!
  }

  type CharacterInput {
    name: String!
    status: String!
    species: String!
    type: String!
    gender: String!
    image: String!
    url: String!
    created: String!
  }
  
  type Query {
    characters(page: Int, name: String): [Character]
    character(id: ID!): Character
  } 
  
  type Mutation {
    createCharacter(
      name: String!
      status: String!
      species: String!
      type: String
    ): Character
  }
`);