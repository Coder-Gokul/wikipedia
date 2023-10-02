// Javascript variables

const apiUrl ="https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";
const searchBox = document.querySelector("#search input");
const searchBtn = document.querySelector("#search i");
const section = document.querySelector("#displayContent");
const error = document.querySelector("#error");

//getting input value and display error msg if there is no value

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value;

  if (searchInput == "") {
    error.style.display = "flex";
    error.textContent =
      "Search item cannot be empty, Please enter the search input.";
    section.style.display = "none";
  } else {
    error.style.display = "none";
    section.style.display = "block";
    getResult(searchInput);
  }
});

//fetching API, getting result and display error msg if there is invalid input

async function getResult(searchInput) {
  const response = await fetch(apiUrl + searchInput);
  const result = await response.json();

  console.log(result);
  if (result.query.search.length == 0) {
    error.style.display = "flex";
    error.textContent = "Invalid input, Please enter valid search input.";
    section.style.display = "none";
  } else {
    displayResults(result);
  }
}

// Display results

function displayResults(result) {
  let output = "";
  result.query.search.forEach((item) => {
    let resultUrl = `https://en.wikipedia.org/?curid=${item.pageid}`;
    output += `
    
    <a href="${resultUrl}" class="title" target="_blank">
        ${item.title}
    </a>
    <br>
    <a href="${resultUrl}" class="link" target="_blank">
    ${resultUrl}
    </a>
    <p class="content">
      ${item.snippet}
    </p> 
    
    `;
    section.innerHTML = output;
  });
}
