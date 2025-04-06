let input = document.querySelector("#input");
let submit = document.querySelector("#submit");
let result = document.querySelector(".result");

function fetchCountryData() {
  let countryData = input.value;

  if (!countryData) return;

  fetch(`https://restcountries.com/v3.1/name/${countryData}?fullText=true`)
    .then((responce) => {
      if (!responce.ok) {
        throw new Error("Invalid country name");
      }
      return responce.json();
    })
    .then((data) => {
      const countryInfo = data[0];
      result.innerHTML = `
            <img src="${countryInfo.flags.png}" class="flag">
            <h2>${countryInfo.name.common.toUpperCase()}</h2>
            <div class="content">
            <p><strong>Capital:</strong>${countryInfo.capital}</p>
            <p><strong>Continent:</strong>${countryInfo.region}</p>
            <p><strong>Population:</strong>${countryInfo.population.toLocaleString()}</p>
            <p><strong>Currency:</strong>${
              Object.values(countryInfo.currencies)[0].name
            } - ${Object.keys(countryInfo.currencies)[0]} </p>
            <p><strong>Common Language:</strong>${Object.values(
              countryInfo.languages
            ).join(",")}</p>
            </div>
            `;
    })
    .catch((error) => {
      result.innerHTML = `<p style="color:red;">Unable to fetch Data </p>`;
      console.log(`Unable to fetch data ${error}`);
    });
}
submit.addEventListener("click", fetchCountryData);
