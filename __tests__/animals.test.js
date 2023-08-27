const fs = require('fs');

const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal,
} = require("../lib/animals.js");

const { animals } = reqiure("../data/animals");

test("creats an animal object", ()=> {
    const animal = createNewAnimal(
        { name: "Darlene", id: "jdkfdfl3" },
        animals
    );

    expect(animal.name).toBe('Darlene');
    expect(animal.id).toBe("jdkfdfl3");

});


test("filters by query", () => {
    const startingAnimal = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const updateAnimals = filterByQuery({ species: "gorilla"}, startingAnimal);

    expect(updateAnimals.length).toEqual(1);
});