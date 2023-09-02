const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers");

const { zookeepers } = require("../data/zookeepers.json");
const res = require('express/lib/response');
jest.mock("fs");

test("creates an zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "leo", id: "jhdfskjdkj" },
        zookeeper
    );

    expect(zookeeper.name).toBe("leo");
    expect(zookeeper.id).toBe("jhdfskjdkj");
});

test("filter by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Sarala",
            age: "30",
            favouriteAnimal: "leo"
        },
        {
            id: "4",
            name: "Rabin",
            age: "28",
            favouriteAnimal: "coco"
        }
    ];

    const updatedZookeepers = filterByQuery({ favouriteAnimal: "leo" }, startingZookeepers)
    expect(updatedZookeepers.length).toEqual(1);

});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Sarala",
            age: "30",
            favouriteAnimal: "leo"
        },
        {
            id: "4",
            name: "Rabin",
            age: "28",
            favouriteAnimal: "coco"
        }
    ];

    const updatedZookeepers = startingZookeepers.findById("4", startingZookeepers)
    expect(updatedZookeepers.name).toBe("Rabin");
});

test("validates age", () => {
    const zookeeper = {
        id: "3",
        name: "Sarala",
        age: "30",
        favouriteAnimal: "leo"
    }

    const invalidZookeeper = {
        id: "4",
        name: "Rabin",
        age: "28",
        favouriteAnimal: "coco"
    }

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
    
    expect(result).toBe(true);
    expect(result2).toBe(false);

});



