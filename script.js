const dictionary = document.querySelector(".display-container");
const input = document.querySelector("#input");

const phraseSearch = (phrase) => {
  const apiUrl = `https://www.dictionaryapi.com/api/v3/references/medical/json/${phrase}?key=dd59c1e0-bfc4-4397-b37c-6525cf690983`;
  // `https://api.urbandictionary.com/v0/define?term=${phrase}`;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  axios
    .get(apiUrl)
    .then((result) => {
      console.log(result.data);
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
      <div class="column is-capitalized has-text-weight-semibold ">${item.hwi.hw}</div>
    </article>
    <article class="columns">
      <div class="column subtitle has-text-weight-bold">Definition :</div>
      <div class="column has-text-weight-semibold ">${item.shortdef}</div>
    </article>

    <img class="image-divider"
       src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/101448/wedding-divider-png-9.png" />
    `;
    }
    return (dictionary.innerHTML += `<br/>` + define);
  }
};

input.addEventListener("keydown", getPhrase);

// <article class='columns'>
//   <div class='column subtitle has-text-weight-bold'>Example:</div>
//   <div class='column has-text-weight-semibold '>${item.example}</div>
// </article>;
