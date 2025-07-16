const characters = [
  { id: '1', name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: 'Scient', gender: 'cis' },
  { id: '2', name: 'Morty Smith', status: 'Alive', species: 'Human', type: 'None', gender: 'cis' },
]

const CharacterResolver = {
  characters: () => characters,
  characterss: () => characters,
  createCharacter: ({ name, status, species, type, gender }: { name: string; status: string; species: string; type: string; gender: string }) => {
    const newCharacter = {
      id: String(characters.length + 1),
      name,
      status,
      species,
      type,
      gender,
    };
    characters.push(newCharacter);
    return newCharacter;
  },
};

export default CharacterResolver;

