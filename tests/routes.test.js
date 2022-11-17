import {fix_types, fix_pokemon_number} from '../routes/routes.js'

const pokemon_numbers = [
    [1, "001"],
    [2, "002"],
    [15, "015"],
    [151, "151"],
    [23, "023"],
    [3, "003"],
    [0, "000"]
]

test.each(pokemon_numbers)('Test pokemon numbers', async (provided_number, expected_number) => {
    const fixed_number = fix_pokemon_number(provided_number)
    expect(fixed_number).toBe(expected_number);
});
