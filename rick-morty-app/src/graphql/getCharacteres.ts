import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters(
    $page: Int
    $name: String
    $status: String
    $gender: String
    $species: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        status: $status
        gender: $gender
        species: $species
      }
    ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        gender
        species
        status
      }
    }
  }
`;
