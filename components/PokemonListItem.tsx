import React from 'react';

interface PokemonListItemProps {
  pokemon: any;
  onShowDetails: (pokemon: any) => void;
}

const PokemonListItem: React.FC<PokemonListItemProps> = ({ pokemon, onShowDetails }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card" onClick={() => onShowDetails(pokemon)}>
        <img src={pokemon.sprites.front_default} className="card-img-top" alt={pokemon.name} />
        <div className="card-body">
          <h5 className="card-title">{pokemon.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default PokemonListItem;