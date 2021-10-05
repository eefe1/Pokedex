import React, { useState, useEffect } from "react";
import { uniq, uniqBy, remove } from "lodash";

import "./style.css";

const FreePokemonList = ({
  wholePokemonLoadedList,
  showPokemonDetails,
  capturedList,
}) => {
  const [filteredList, setFilteredList] = useState([]);

  //   const removeDuplicatePokemonAndCaptured = async (wholePokemonLoadedList) => {

  // //     const toDelete = new Set(wholePokemonLoadedList);
  // // const newArray = wholePokemonLoadedList.filter(pokemon => !toDelete.has(pokemon.id));

  //     // const filteredUniquePokemons = await Array.from(
  //     //   new Set(wholePokemonLoadedList)
  //     // );

  //     const filterCaptured = await newArray.map((pokemon) => {
  //       return pokemon.captured !== true;
  //     });

  //     return setFilteredList(filterCaptured);
  //   };

  async function uniquePokemons(wholePokemonLoadedList) {
    let filteredArray = await _.uniqBy(
      wholePokemonLoadedList,
      function (pokemon) {
        return pokemon.id;
      }
    );
    const properties = [
      "id",
      "height",
      "weight",
      "name",
      "abilities",
      "forms",
      "moves",
      "species",
      "sprites",
      "stats",
      "types",
      "captured",
    ];

    let result = filteredArray
      .filter(function (pokemonOne) {
        // filter out (!) items in capturedList
        return !capturedList.some(function (pokemonTwo) {
          return pokemonOne.id === pokemonTwo.id;
        });
      })
      .map(function (pokemon) {
        // use reduce to make objects with only the required properties
        // and map to apply this to the filtered array as a whole
        return properties.reduce(function (freePokemon, name) {
          freePokemon[name] = pokemon[name];
          return freePokemon;
        }, {});
      });

    return setFilteredList(result);
  }

  useEffect(() => {
    uniquePokemons(wholePokemonLoadedList);
  }, []);

  return (
    <div className="free-pokemon-list">
      <h1>Free Pokemon List</h1>
      <ul>
        {filteredList?.map((pokemon, i) => {
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
export default FreePokemonList;
