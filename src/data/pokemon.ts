import csv from "../data/pokemon.csv?raw";
import Papa from "papaparse";

interface PokemonCsvRow {
	pokedex: number;
	name: string;
}

interface Pokemon {
	pokedex: number;
	name: string;
	matches: string[];
}

const csvData = Papa.parse<PokemonCsvRow>(csv, {
	header: true,
	dynamicTyping: true,
	skipEmptyLines: true,
}).data as PokemonCsvRow[];

const pokemon: Pokemon[] = [];

for (const mon of csvData) {
	pokemon.push({
		pokedex: mon.pokedex,
		name: mon.name,
		matches: [" " + mon.name.toLowerCase() + " "],
	});
}

export function getPokemon() {
	return pokemon;
}