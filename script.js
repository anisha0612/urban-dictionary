const dictionary = document.querySelector(".display-container");
const input = document.querySelector("#input");

const phraseSearch = (phrase) => {
  const apiUrl = `http://urbanscraper.herokuapp.com/search/${phrase}`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  axios
    .get(proxyUrl + apiUrl)
    .then((result) => {
      displayContent(result.data);
    })
    .catch((err) => {
      console.log("Unable to load");
    });
};

const getPhrase = (event) => {
  if (event.keyCode === 13) {
    phraseSearch(event.target.value);
  }
};

const displayContent = (items) => {
  dictionary.classList.add("box");
  for (let item of items) {
    dictionary.innerHTML = `
    <article class="columns">
      <div class="column subtitle has-text-weight-bold">Phrase :</div>
      <div class="column is-capitalized has-text-weight-semibold ">${item.term}</div>
    </article>
    <article class="columns">
      <div class="column subtitle has-text-weight-bold">Definition :</div>
      <div class="column has-text-weight-semibold ">${item.definition}</div>
    </article>
    <article class="columns">
      <div class="column subtitle has-text-weight-bold">Example:</div>
      <div class="column has-text-weight-semibold ">${item.example}</div>
    </article> 
    `;
  }
};

input.addEventListener("keydown", getPhrase);
