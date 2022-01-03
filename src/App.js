import './App.css';
import React, {useState, useEffect} from "react";
import {fetchPeople} from "./api_fetch";


async function callAPI(url) {
    return await fetchPeople(url);
}

function Character(props) {
    const {name, image, gender, status, origin} = props.character
    return (
        <div className={"Card"}>
            <h2>{name}</h2>
            <img src={image} alt={name}/>
            <div className={"InfoCard"}>
                <p>Gender: {gender}</p>
                <p>Status: {status}</p>
                <p>Origin: {origin.name}</p>
            </div>
        </div>
    );
}

function Characters(props) {
    if (props.characters && props.characters.results && props.characters.results.length) {
        return props.characters.results.map((character) =>
            (<Character character={character} key={character.id}/>)
        );
    }
    return null;
}

 const changeCharacter = (setCharacters, url) => {
    if (url) {
        callAPI(url).then(setCharacters)
    }
}

const changePage = (setApiUrl) => {
    return (url) => {
        setApiUrl(url)
    }
}

function App() {
    let charInput = React.createRef()
    const [characters, setCharacters] = useState([])
    const [apiURL, setApiUrl] = useState("https://rickandmortyapi.com/api/character/")
    const nameURL = "https://rickandmortyapi.com/api/character/?name="
    const _changePage = changePage(setApiUrl)

    useEffect(() => {
        changeCharacter(setCharacters, apiURL)
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
                    <input type={"textarea"} ref={charInput} onKeyPress={e => {
                        if (e.key === "Enter") {
                            _changePage(nameURL + charInput.current.value)
                        }
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
