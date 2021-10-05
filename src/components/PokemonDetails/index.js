import React, { useState } from "react";
import "./style.css";

const PokemonDetails = ({
  pokemon,
  pokemonData,
  setCapturedList,
  capturedList,
  setPokemonData,
}) => {
  //destructuring
  const {
    height,
    weight,
    name,
    abilities,
    forms,
    moves,
    species,
    sprites,
    stats,
    types,
    captured,
    id,
  } = pokemon;

  const [capturedText, setCapturedText] = useState(captured);

  const toggleCapture = (id) => {
    let pokemonCaptureList = pokemonData.map((pokemon) => {
      return pokemon.id === id
        ? { ...pokemon, captured: !pokemon.captured }
        : { ...pokemon };
    });
    setPokemonData(pokemonCaptureList);
    setCapturedText(!capturedText);
    setCapturedList((capturedList) => [...capturedList, pokemon]);
  };

  return (
    <div className="pokeman-details-screen">
      <h1>Pokemon Details</h1>
      <div className="pokemon-details-list">
        <div className={"pokemon-name"}>
          <p>{name}</p>
        </div>
        <p style={{ color: "#555" }}>Abilities:</p>
        {abilities.map((abilityObj) => {
          return <p>{abilityObj.ability.name}</p>;
        })}
        <p style={{ color: "#555" }}>Forms:</p>
        {forms.map((formObj) => {
          return <p>{formObj.name}</p>;
        })}

        <p>Height: {height}</p>
        {/*  <p style={{color: '#555'}}>Moves:</p>
        {moves.map((movesObj) => {
          return <p>{movesObj.move.name}</p>;
        })}*/}

        {/* <p>{ species}</p> */}
        <img src={sprites.front_default} />
        <p style={{ color: "#555" }}>Stats:</p>
        {stats.map((statsObj) => {
          return <p>{statsObj.stat.name}</p>;
        })}
        {/* <p>{ stats}</p> */}
        <p style={{ color: "#555" }}>Types:</p>
        {types.map((typesObj) => {
          return <p>{typesObj.type.name}</p>;
        })}

        <p>Weight: {weight}</p>
        <button onClick={() => toggleCapture(id)}>
          {capturedText ? "Release it!" : "Capture it!"}
        </button>
      </div>
    </div>
  );
};

export default PokemonDetails;
