const countriesTraveled = {
  name: "Matthieu",
  countries: [
      {
          name: "United States",
          year: 2010
      },
      {
          name: "Italia",
          year: 2012
      },
      {
          name: "Scotland",
          year: 2014
      },
      {
          name: "Spain",
          year: 2015
      },
      {
          name: "England",
          year: 2009
      }
  ]
};

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  fetch("http://localhost:3000/api/countries", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(countriesTraveled)
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById("result").textContent = result;
  })
  .catch(err => {
      console.log(err.message)
  })
});