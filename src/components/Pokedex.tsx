import { getPokemon } from "../data/pokemon";
import { useCaught } from "../hooks/useCaught";
import "./Pokedex.css";
import PokedexEntry from "./PokedexEntry";

function Pokedex() {
	const pokemon = getPokemon();
	const { caught } = useCaught();

	return (
		<div className="pokedex">
			{pokemon.map((mon) => (
				<PokedexEntry
					key={mon.pokedex}
					pokemon={mon}
					caught={caught[mon.pokedex] != undefined}
				/>
			))}
		</div>
	);
}

export default Pokedex;
