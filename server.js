const { animals } = require("./data/animals");

const express = require("express");
const app = express();

app.listen(3001, () => {
  console.log("API server now on port 3001");
});

function filterByQuery(query, animalsArray) {
  let filterdResult = animalsArray;
  if (query.diet) {
    filterdResult = filterdResult.filter(
      (animal) => animal.diet === query.diet
    );
  }

  if (query.species) {
    filterdResult = filterdResult.filter(
      (animal) => animal.species === query.species
    );
  }

  if (query.name) {
    filterdResult = filterdResult.filter(
      (animal) => animal.name === query.name
    );
  }

  return filterdResult;
}

app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  console.log(req.query);

  res.json(results);
});
