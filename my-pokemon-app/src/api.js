export async function fetchPokemonData(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error('Not found');
  return await res.json();
}
export async function fetchEvolutionChain(speciesUrl) {
  const resSpecies = await fetch(speciesUrl);
  const speciesData = await resSpecies.json();
  const evoUrl = speciesData.evolution_chain.url;
  const resEvo = await fetch(evoUrl);
  const evoData = await resEvo.json();
  const chain = [];
  let evo = evoData.chain;
  while (evo) {
    chain.push(evo.species.name);
    evo = evo.evolves_to[0];
  }
  return chain;
}