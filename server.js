const { animals } = require("./data/animals");

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(3001, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  console.log(req.query);

  res.json(results);
});


function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
// Note that we save the animalsArray as filteredResults
  let filteredResult = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array
    // If personalityTraits is a string, place it into a new array and save
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // loop through each traits in the personalityTraits array
    personalityTraitsArray.forEach(trait => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by filter, the filteredResults
      // array will then contain only the enteries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the traits when .forEach() loop is finished.
      filteredResult = filteredResult.filter
        (animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }

  if (query.diet) {
    filteredResult = filteredResult.filter
      (animal => animal.diet === query.diet
    );
  }

  if (query.species) {
    filteredResult = filteredResult.filter
      (animal => animal.species === query.species
    );
  }

  if (query.name) {
    filteredResult = filteredResult.filter
      (animal => animal.name === query.name
    );
  }

  return filteredResult;
}

