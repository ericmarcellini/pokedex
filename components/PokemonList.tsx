"use client";

import React, { useState, useEffect } from 'react';
import PokemonListItem from './PokemonListItem';
import PokemonModal from './PokemonModal';

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load the Pokémon list
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map((pokemon: any) => fetch(pokemon.url).then(res => res.json()));
        Promise.all(promises).then(results => setPokemonList(results));
      });
  }, []);

  const handleShowDetails = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="container">
      <div className="row pokemon-list-group" style={{ backgroundColor: 'white' }}>
        {pokemonList.map(pokemon => (
          <PokemonListItem key={pokemon.id} pokemon={pokemon} onShowDetails={handleShowDetails} />
        ))}
      </div>
      <PokemonModal pokemon={selectedPokemon} showModal={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default PokemonList;