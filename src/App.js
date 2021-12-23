import './App.css';
import React, {useState, useEffect} from "react";
import {fetchPeople, hasState, mapToName} from "./api_fetch";


async function callAPI(url) {
    return await fetchPeople(url);
}

function Character(props) {
    // console.log("Props: ", props)
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

 const changeCharacter = (url, setCharacters) => {
    // console.log("Current: ", url)
    if (url !== null) {
        callAPI(url).then(setCharacters)
    }
}

const changePage = (characters, setPrevPage, setNextPage) => {
    // console.log("Prev: ", characters.info.prev)
    // console.log("Next: ", characters.info.next)
    setPrevPage(characters.info.prev);
    setNextPage(characters.info.next);
}

function App() {
    const [characters, setCharacters] = useState("Loading")
    const [prevPage, setPrevPage] = useState("")
    const [nextPage, setNextPage] = useState("https://rickandmortyapi.com/api/character/?page=2")
    const apiURL = "https://rickandmortyapi.com/api/character/"

    useEffect(() => {
        // callAPI().then(setCharacters)
        callAPI(apiURL).then(setCharacters).then(() => changePage(characters, setPrevPage, setNextPage))
        // changePage(apiURL)
    }, [])

    return (
        <div className={"App"}>
            <header className={"App-header"}>
                <h1>Rick and Morty API</h1>
                <div className={"InputFields"}>
                    <input type={"button"} value={"Previous Page"}
                           onClick={() => {
                               changePage(characters, setPrevPage, setNextPage)
                               changeCharacter(prevPage, setCharacters)
                           }}/>
                    <input type={"button"} value={"Next Page"}
                           onClick={() => {
                               console.log(nextPage)
                               changePage(characters, setPrevPage, setNextPage)
                               console.log(nextPage)
                               changeCharacter(nextPage, setCharacters)
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
