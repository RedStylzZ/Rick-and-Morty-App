async function fetchPeople(url) {
    const response = await fetch(url)
    const data = await response.json()
    // return (data && data.results) || []
    return data || []
}

/*
function hasState(status) {
    return function (data) {
        return data.status === status;
    }
}
*/
const hasState = status => data => data.status === status

/*function mapToName(human) {
    return human.name
}*/
const mapToName = human => human.name

/*function createObjects(human) {
    return {name: human.name, origin: human.origin}
}*/
const createObjects = human => ({name: human.name, origin: human.origin.name})

async function mapPeople(func) {
    return (await fetchPeople()).filter(hasState("Alive")).map(func)
}

function api_fetch() {
    mapPeople(mapToName).then(console.log)
    mapPeople(createObjects).then(console.log)
}

export {fetchPeople, hasState, mapPeople, mapToName, api_fetch}