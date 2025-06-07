import React from 'react';
export default function PokemonList({ pokemonList, onAddFavorite }) {
  return (
    <div className="p-4 grid grid-4">
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default}
            alt={pokemon.name}
            className="pokemon-img"
          />
          <p className="capitalize">{pokemon.name}</p>
          {onAddFavorite && (
            <button
              onClick={() =>
                onAddFavorite({
                  id: pokemon.id.toString(),
                  name: pokemon.name,
                  image: pokemon.sprites?.other?.['official-artwork']?.front_default,
                })
              }
              className="primary mt-2"
            >
              Add to Favorites
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
