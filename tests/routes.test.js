import {fix_types, fix_pokemon_number, fix_name} from '../routes/routes.js'

const pokemon_numbers = [
    [1, "001"],
    [2, "002"],
    [15, "015"],
    [151, "151"],
    [23, "023"],
    [3, "003"],
    [0, "000"]
]

const pokemon_names = [
    ["charizard","Charizard"],
    ["mew","Mew"],
    ["Charmander","Charmander"],
    ["gardevoir","Gardevoir"],
    ["mewtwo","Mewtwo"],
]

test.each(pokemon_numbers)('Test pokemon numbers', async (provided_number, expected_number) => {
    const fixed_number = fix_pokemon_number(provided_number);
    expect(fixed_number).toBe(expected_number);
});


test.each(pokemon_names)("Test pokemon names", async (provided_name, expected_name) => {
    const fixed_name = fix_name(provided_name);
    expect(fixed_name).toBe(expected_name)
})