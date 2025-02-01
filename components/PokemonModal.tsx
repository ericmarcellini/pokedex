import React from 'react';

interface PokemonModalProps {
  pokemon: any;
  showModal: boolean;
  onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, showModal, onClose }) => {
  if (!pokemon) return null;

  const abilities = pokemon.abilities.map((ability: any) => ability.ability.name).join(', ');

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} id="pokemonModal" tabIndex={-1} role="dialog" aria-labelledby="pokemonModalTitle" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="pokemonModalTitle">{pokemon.name}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map((type: any) => type.type.name).join(', ')}</p>
            <p>Abilities: {abilities}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;