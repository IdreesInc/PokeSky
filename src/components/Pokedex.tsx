import { getPokemon } from "../data/pokemon";
import "./Pokedex.css";
import PokedexEntry from "./PokedexEntry";

function Pokedex() {
	const pokemon = getPokemon();

	return (
		<div className="pokedex">
			{pokemon.map((mon) => (
				<PokedexEntry />
			))}
		</div>
	);
}

export default Pokedex;
