import './App.css';
import React, {useState, useEffect} from "react";
import {fetchPeople} from "./api_fetch";


async function callAPI(url) {
    return await fetchPeople(url);
}

function Character(props) {
    return (
        <div className={"Card"}>
            <h2>{props.name}</h2>
            <img src={props.image} alt={props.name}/>
            <div className={"InfoCard"}>
                <p>Gender: {props.gender}</p>
                <p>Status: {props.status}</p>
                <p>Origin: {props.origin.name}</p>
            </div>
        </div>
    );
}

function Characters(props) {
    if (Array.isArray(props.characters.results)) {
        return props.characters.results.map(Character);
    }
    return null;
}

/* const changeCharacter = (setCharacters) => (url) => {
    // console.log("Current: ", url)
    if (!url) {
        callAPI(url).then(setCharacters)
    }
}*/

const changePage = (setApiUrl) => {
    return (url) => {
        // console.log("Prev: ", characters.info.prev)
        // console.log("Next: ", characters.info.next)
        setApiUrl(url)
    }
}

function App() {
    const [characters, setCharacters] = useState("Loading")
    // const [prevPage, setPrevPage] = useState("https://rickandmortyapi.com/api/character/")
    // const [nextPage, setNextPage] = useState("https://rickandmortyapi.com/api/character/")
    const [apiURL, setApiUrl] = useState("https://rickandmortyapi.com/api/character/")
    const _changePage = changePage(setApiUrl)
    // const _changeCharacter = changeCharacter(setCharacters)

    useEffect(() => {
        callAPI(apiURL).then(setCharacters)
    }, [apiURL])
    return (
        <div className={"App"}>
            <header className={"App-header"}>
                <h1>Rick and Morty API</h1>
                <div className={"InputFields"}>
                    <input type={"button"} value={"Previous Page"}
                           onClick={() => {
                               _changePage(characters.info.prev)
                           }}/>
                    <input type={"button"} value={"Next Page"}
                           onClick={() => {
                               _changePage(characters.info.next)
                           }}/>
                </div>
                <div className={"Outer"}>
                    <div className={"Inner"}>
                        <Characters characters={characters}/>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
