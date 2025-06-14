// src/graphql/getCharacteresById.ts
import { gql } from "@apollo/client";

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      gender
      species
      status
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;
