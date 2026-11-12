import { getPokemon } from "../data/pokemon";
import { useCaught } from "../hooks/useCaught";
import "./Pokedex.css";
import PokedexEntry from "./PokedexEntry";

const LOAD_TIME = Date.now();

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
					justCaught={(caught[mon.pokedex]?.time ?? 0) > LOAD_TIME}
				/>
			))}
		</div>
	);
}

export default Pokedex;
