const dictionary = document.querySelector(".display-container");
const input = document.querySelector("#input");

const phraseSearch = (phrase) => {
  const apiUrl = `http://api.urbandictionary.com/v0/define?term=${phrase}`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  axios
    .get(apiUrl)
    .then((result) => {
      console.log(result.data.list);
      displayContent(result.data.list);
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
  let define = ``;
  dictionary.classList.add("box");
  if (!Array.isArray(items) || !items.length) {
    return (dictionary.innerHTML = `
    <article class="columns">
      <div class="column subtitle has-text-weight-bold">No Results Found!! Term doesn't doesn't Exist!</div>
    </article>`);
  } else {
    dictionary.innerHTML = ``;
    for (let item of items) {
      define += `
    <article class="columns">
      <div class="column subtitle has-text-weight-bold">Term :</div>
      <div class="column is-capitalized has-text-weight-semibold ">${item.word}</div>
    </article>
    <article class="columns">
      <div class="column subtitle has-text-weight-bold">Definition :</div>
      <div class="column has-text-weight-semibold ">${item.definition}</div>
    </article>
    <article class="columns">
      <div class="column subtitle has-text-weight-bold">Example:</div>
      <div class="column has-text-weight-semibold ">${item.example}</div>
    </article>
    <img class="image-divider"
       src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/101448/wedding-divider-png-9.png" />
    `;
    }
    return (dictionary.innerHTML += `<br/>` + define);
  }
};

input.addEventListener("keydown", getPhrase);
