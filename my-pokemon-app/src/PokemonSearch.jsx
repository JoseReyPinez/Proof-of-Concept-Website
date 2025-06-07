import React, { useState } from 'react';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
export default function PokemonSearch({ user }) {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [shiny, setShiny] = useState(false);
  const searchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    const data = await res.json();
    setPokemon(data);
  };
  const playCry = () => {
    const cry = new Audio(`/cries/${pokemon.id}.mp3`);
    cry.play();
  };
  const addToFavorites = async () => {
    if (!user || !pokemon) return;
    const docRef = doc(db, 'users', user.uid, 'favorites', pokemon.name);
    await setDoc(docRef, {
      name: pokemon.name,
      image: shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default,
    });
    alert(`${pokemon.name} added to favorites!`);
  };
  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Pokémon"
          className="border p-2"
        />
        <button onClick={searchPokemon} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>
      {pokemon && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-4 border rounded shadow-md">
          <h2 className="text-xl capitalize font-bold mb-2">{pokemon.name}</h2>
          <img
            src={shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto"
          />
          <div className="my-2">
            <button onClick={() => setShiny(!shiny)} className="bg-yellow-400 px-3 py-1 rounded mr-2">
              Toggle Shiny
            </button>
            <button onClick={playCry} className="bg-indigo-500 text-white px-3 py-1 rounded">
              Play Cry
            </button>
          </div>
          <div className="mt-4 text-left">
            <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Height:</strong> {pokemon.height} | <strong>Weight:</strong> {pokemon.weight}</p>
            <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
            <p><strong>Stats:</strong></p>
            <ul className="ml-4 list-disc">
              {pokemon.stats.map(stat => (
                <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
              ))}
            </ul>
          </div>
          {user && (
            <button onClick={addToFavorites} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Add to Favorites
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
