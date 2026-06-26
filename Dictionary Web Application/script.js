const form = document.querySelector('form'); // Select the first form element on the page
const resultDiv = document.querySelector('.result'); // Select the element with class "result" in order to display output later)

form.addEventListener('submit', (e)=>{ //Runs function when form is submitted 
    e.preventDefault();   // Stops the page from refreshing when form is submitted
    getWordInfo(form.elements[0].value); // gets value from first input in form and sends it to getWordInfo function
});

const getWordInfo = async (word) => { //Creates a function called getWordInfo: It takes one input: word (like "hello")
    try{
        resultDiv.innerHTML = "Fetching data...";
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`); //Sends a request to a dictionary website API
    const data = await response.json(); //Sends a request to a dictionary website API. .json() converts it into a real JavaScript object/array

    let definitions = data[0].meanings[0].definitions[0]; // Gets first definition from first meaning

    //Displays results on Page
    resultDiv.innerHTML = `
        <h2><strong>Word:<strong> ${data[0].word}</h2> 

        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>

        <p><strong>Meaning:</strong> ${definitions.definition === undefined ? "Not Found" : 
        definitions.definition}</p>

        <p><strong>Example:</strong> ${definitions.example === undefined ? "Not Found" : 
        definitions.example}</p>
        <p><strong>Antonyms:</strong></p>
        `;
        //Fetching Antonyms
        if(definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }
        else{
        for(let i=0; i<definitions.antonyms.length; i++) {
            resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
        }
     }

     //Adds Read more button
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read 
    More</a></div>`
    } 
    catch(error) {
        resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`
    }
}

