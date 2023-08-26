
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


   