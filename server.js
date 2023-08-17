const fs = require("fs");
const path = require("path");
const { animals } = require("./data/animals");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

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
    personalityTraitsArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by filter, the filteredResults
      // array will then contain only the enteries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the traits when .forEach() loop is finished.
      filteredResult = filteredResult.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    
    if (query.diet) {
      filteredResult = filteredResult.filter(
        (animal) => animal.diet === query.diet
        );
      }

  if (query.species) {
    filteredResult = filteredResult.filter(
      (animal) => animal.species === query.species
      );
    }
    
    if (query.name) {
      filteredResult = filteredResult.filter(
        (animal) => animal.name === query.name
        );
      }
      
      return filteredResult;
    }
    
    function findById(id, animalsArray) {
      const result = animalsArray.filter((animal) => animal.id === id)[0];
      return result;
    }
    
    function createNewAnimal(body, animalsArray) {
      console.log(body);
      // our function's main code will go here!
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, "./data/animals.json"),
    JSON.stringify({ animals: animalsArray }, null, 2)
    );
    // return finished code to post route for response
    return animal;
  }
  
  function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== "string") {
      return false;
    }
    if (!animal.species || typeof animal.species !== "string") {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== "string") {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
  }
  
  app.get("/api/animals", (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    console.log(req.query);

  res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(400);
  }
});


app.post("/api/animals", (req, res) => {
  // req.body is where our incoming content will be
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();
  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    //add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    console.log(req.body);
    res.json(animal);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
