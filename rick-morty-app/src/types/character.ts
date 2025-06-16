export interface Character {
  id: string;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}
