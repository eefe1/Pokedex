import React from "react";
import "./style.css";

const AllPokemonList = ({ pokemonData, showPokemonDetails, props }) => {
  return (
    <div className="all-pokemon-list">
      <h1>All Pokemon List</h1>
      <ul>
        {pokemonData?.map((pokemon, i) => {
          return (
            <li className="pokemon">
              <button
                key={i}
                onClick={() => showPokemonDetails(pokemon.id)}
                style={{
                  border: pokemon.captured ? "1px solid #FFEA00" : "none",
                }}
              >
                {pokemon.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllPokemonList;
