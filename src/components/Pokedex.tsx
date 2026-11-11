import { useState } from "react";
import { getPokemon } from "../data/pokemon";
import { useCaught } from "../hooks/useCaught";
import "./Pokedex.css";
import PokedexEntry from "./PokedexEntry";

const LOAD_TIME = Date.now();

function Pokedex() {
	const [fullSize, setFullSize] = useState(false);
	const pokemon = getPokemon();
	const { caught } = useCaught();

	return (
		<div className={`pokedex ${fullSize ? "pokedexAnimating" : ""}`}
			onAnimationStart={(e) => e.animationName === "unlock" && setFullSize(true)}
			onAnimationEnd={(e) => e.animationName === "unlock" && setFullSize(false)}
		>
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
