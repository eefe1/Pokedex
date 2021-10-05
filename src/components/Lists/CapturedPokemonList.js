import React from "react";
import './style.css'

const CapturedPokemonList = ({ capturedList, showPokemonDetails }) => {
  return (
    <div className="captured-pokemon-list">
      <h1>Captured Pokemon List</h1>
      <ul>
        {capturedList?.map((pokemon, i) => {
          return (
            <li className="pokemon">
              <button key={i} onClick={() => showPokemonDetails(pokemon.id)}>
                {pokemon.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CapturedPokemonList;
