import React, { useState } from 'react';
export default function PokemonDisplay({ pokemon, user, onAddFavorite }) {
  const [showShiny, setShowShiny] = useState(false);
  if (!pokemon) return <p>No Pokémon selected</p>;
  const imageUrl = showShiny
    ? pokemon.sprites?.other?.['official-artwork']?.front_shiny
    : pokemon.sprites?.other?.['official-artwork']?.front_default;
  const abilities = pokemon.abilities ?? [];
  const stats = pokemon.stats ?? [];
  const handleAddFavorite = () => {
    if (!user) {
      alert("You need to be logged in to add favorites.");
      return;
    }
    onAddFavorite({
      name: pokemon.name,
      image: imageUrl,
    });
  };
  return (
    <div className="p-4 center">
      <h2 className="capitalize">{pokemon.name}</h2>
      <img src={imageUrl} alt={pokemon.name} className="pokemon-img" />
      <div className="mt-2">
        <button onClick={() => setShowShiny(!showShiny)} className="secondary">
          {showShiny ? 'Show Normal' : 'Show Shiny'}
        </button>
      </div>
      <div className="mt-2">
        <strong>Abilities:</strong>{' '}
        {abilities.length > 0 ? abilities.map((a) => a.ability.name).join(', ') : 'N/A'}
      </div>
      <div className="mt-2">
        <strong>Stats:</strong>
        <ul>
          {stats.length > 0 ? (
            stats.map((s) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))
          ) : (
            <li>N/A</li>
          )}
        </ul>
      </div>
      <button onClick={handleAddFavorite} style={{ marginTop: '1rem' }}>
        Add to Favorites
      </button>
    </div>
  );
}
