import { fix_types, fix_pokemon_number, fix_name } from "../routes/routes.js";

const pokemon_numbers = [
  [1, "001"],
  [2, "002"],
  [15, "015"],
  [151, "151"],
  [23, "023"],
  [null, undefined],
  [undefined, undefined],
  [0, "000"],
];

const pokemon_names = [
  ["charizard", "Charizard"],
  ["mew", "Mew"],
  ["Charmander", "Charmander"],
  ["gardevoir", "Gardevoir"],
  ["mewtwo", "Mewtwo"],
  [undefined, undefined],
  [null, undefined],
];

const pokemon_types = [
    ["grass", "flying", ["grass", "flying"]],
    ["fire", "ghost", ["fire", "ghost"]],
    ["psychic", "", ["psychic"]],
  ];

test.each(pokemon_numbers)(
  "Test pokemon numbers",
  async (provided_number, expected_number) => {
    const fixed_number = fix_pokemon_number(provided_number);
    expect(fixed_number).toBe(expected_number);
  }
);

test.each(pokemon_names)("Test pokemon names", async (provided_name, expected_name) => {
    const fixed_name = fix_name(provided_name);
    expect(fixed_name).toBe(expected_name)
})

test.each(pokemon_types)(
  "Test pokemon types",
  async (provided_type_1, provided_type_2, expected_types) => {
    const fixed_types = fix_types(provided_type_1, provided_type_2);
    console.log(fixed_types)
    expect(fixed_types).toStrictEqual(expected_types);
  }
);
