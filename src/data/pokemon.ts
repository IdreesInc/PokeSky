import csv from "../data/pokemon.csv?raw";
import Papa from "papaparse";

interface PokemonCsvRow {
	pokedex: number;
	name: string;
	primaryType: string;
	secondaryType: string | null;
}

export interface Pokemon {
	pokedex: number;
	name: string;
	primaryType: string;
	secondaryType: string | null;
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
		primaryType: mon.primaryType,
		secondaryType: mon.secondaryType
	});
}

export function getPokemon() {
	return pokemon;
}
