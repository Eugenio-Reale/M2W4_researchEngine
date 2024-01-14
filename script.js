const form = document.querySelector("#jobForm");
const inpTitle = document.querySelector("#inputTitle");
const inpLocation = document.querySelector("#inputLocation");
const resultDiv = document.querySelector("#resultDiv");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = getFormData()                 //query = target of the research
    clearInputs()
    //validate query controls whether inputs are suitable (at least one of them > 1)
    if (validateQuery(query)) {
        showResults(search(query))
    }
})

function getFormData() {
    const query = {
        queryTitle: inpTitle.value,
        queryLocation: inpLocation.value
    }
    return query
}

function clearInputs() {
    inpTitle.value = null;
    inpLocation.value = null;
    resultDiv.replaceChildren();
}

function validateQuery(query) {
    let valid = true;
    if (query.queryTitle === "" && query.queryLocation === "") {
        valid = false;
        alert("Both fields are empty.\nPlease fill at least one of them.");
    }
    else if (query.queryTitle.length < 2 && query.queryLocation.length < 2) {
        valid = false;
        alert("Invalid search item.\nPlease insert at least 2 charcaters.");
    }
    return valid
}

function search(query) {

    let searchResults = {
        result: [],
        count: 0
    };
    for (let i = 0; i < jobs.length; i++) {

        //findtitle and findLocation accept to find "" (always true) only if the other 'find'function is looking for something
        if (findTile(query, i) && findLocation(query, i)) {
            searchResults.result.push(jobs[i]);
            searchResults.count++;
        }

    }
    return searchResults
}

function findTile(query, i) {

    if (jobs[i].location.length > 1 && jobs[i].title.toLowerCase().includes(query.queryTitle.toLowerCase())) {
        return true
    }
    else {
        return false
    }

}

function findLocation(query, i) {

    if (jobs[i].title.length > 1 && jobs[i].location.toLowerCase().includes(query.queryLocation.toLowerCase())) {
        return true
    }
    else {
        return false
    }

}

function showResults(searchResults) {
    const resultNumber = document.createElement("p")
    const resultList = document.createElement("ul")
    let plural = "";

    if (searchResults.count != 1) {
        plural = "s";
    }
    const numberPText = searchResults.count + " result" + plural + " found.";
    resultNumber.innerText = numberPText;
    resultDiv.appendChild(resultNumber);

    populateResultUl(searchResults, resultList)
    resultDiv.appendChild(resultList);
}

function populateResultUl(searchResults, resultList) {

    const listItem = document.createElement("li");

    for (let i = 0; i < searchResults.result.length; i++) {
        listItem.innerText = "Employment: " + searchResults.result[i].title + "\nLocation: " + searchResults.result[i].location;
        resultList.appendChild(listItem.cloneNode(true));
        resultList.appendChild(document.createElement("br"));
    }

}






