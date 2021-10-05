import React, { useState, useEffect } from "react";
import {
  getPokemon,
  getAllPokemon,
  getPokemonDetails,
} from "../services/pokemon";
import "./App.css";
import PokemonDetails from "../components/PokemonDetails";
import AllPokemonList from "../components/Lists/AllPokemonList";
import CapturedPokemonList from "../components/Lists/CapturedPokemonList";
import FreePokemonList from "../components/Lists/FreePokemonList";
import pokedex from "../images/backgroundImage.svg";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPage, setShowPage] = useState("allPokemon");
  const [pokemon, setPokemon] = useState(null);
  const [capturedList, setCapturedList] = useState([]);
  const [activateCapturedList, setActivateCapturedList] = useState(true);
  const [wholePokemonLoadedList, setWholePokemonLoadedList] = useState([]);
  const baseURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(baseURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    const pokemonWithCapturedAttr = _pokemonData.map((pokemon) => ({
      ...pokemon,
      captured: false,
    }));
    setPokemonData(pokemonWithCapturedAttr);
  };

  const addAllPokemonFetchedToAList = (pokemonData) => {
    setWholePokemonLoadedList((wholePokemonLoadedList) => [
      ...wholePokemonLoadedList,
      ...pokemonData,
    ]);
  };

  const showPokemonDetails = (id) => {
    let pokemonClicked = pokemonData.find((pokemon) => pokemon.id === id);
    setPokemon(pokemonClicked);
    return setShowPage("details");
  };

  useEffect(() => {
    if (capturedList?.length > 0) {
      setActivateCapturedList(false);
    } else {
      setActivateCapturedList(true);
    }
  }, [capturedList]);

  useEffect(() => {
    return addAllPokemonFetchedToAList(pokemonData);
  }, [pokemonData, nextUrl, prevUrl]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${pokedex})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "860px auto",
        }}
      >
        {loading ? (
          <h1 style={{ textAlign: "center", marginTop: "70%" }}>
            Loading........
          </h1>
        ) : (
          <>
            <div className="btn-top">
              <button onClick={() => setShowPage("allPokemon")}>
                All Pokemon
              </button>
              <button
                disabled={activateCapturedList}
                onClick={() => setShowPage("capturedPokemon")}
              >
                Captured
              </button>
              <button onClick={() => setShowPage("freePokemon")}>Free</button>
            </div>

            <div className="btn next-prev">
              <button className="prev-btn" onClick={prev}>
                Prev
              </button>
              <button className="next-btn" onClick={next}>
                Next
              </button>
            </div>
            {showPage === "allPokemon" ? (
              <AllPokemonList
                setCapturedList={setCapturedList}
                pokemonData={pokemonData}
                showPokemonDetails={showPokemonDetails}
              ></AllPokemonList>
            ) : null}
            {showPage === "capturedPokemon" ? (
              <CapturedPokemonList
                showPokemonDetails={showPokemonDetails}
                capturedList={capturedList}
              ></CapturedPokemonList>
            ) : null}
            {showPage === "freePokemon" ? (
              <FreePokemonList
                wholePokemonLoadedList={wholePokemonLoadedList}
                showPokemonDetails={showPokemonDetails}
                capturedList={capturedList}
              ></FreePokemonList>
            ) : null}
            {showPage === "details" ? (
              <PokemonDetails
                pokemonData={pokemonData}
                pokemon={pokemon}
                setCapturedList={setCapturedList}
                capturedList={capturedList}
                setPokemonData={setPokemonData}
              ></PokemonDetails>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

export default App;
