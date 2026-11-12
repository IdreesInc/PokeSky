import type { Pokemon } from "../data/pokemon";
import "./Card.css";
import "./PokedexEntry.css";

type PokedexEntryProps = {
	pokemon: Pokemon;
	caught: boolean;
	justCaught: boolean;
};

function PokedexEntry({ pokemon, caught, justCaught }: PokedexEntryProps) {
	return (
		<div
			className={`pokedexEntry card ${caught ? "caught" : "uncaught"} ${justCaught ? "justCaught" : ""} ${pokemon.primaryType.toLowerCase()}Type`}
			id={`pokedexEntry${pokemon.pokedex}`}
		>
			<img src={`renders/${pokemon.pokedex}.webp`} loading="lazy"></img>
			<div className="pokemonName">{pokemon.name}&nbsp;</div>
			<div className="typeHolder">
				<div className={`type ${pokemon.primaryType.toLowerCase()}Type`}>
					{pokemon.primaryType}
				</div>
				{pokemon.secondaryType && (
					<div className={`type ${pokemon.secondaryType?.toLowerCase()}Type`}>
						{pokemon.secondaryType}
					</div>
				)}
			</div>
		</div>
	);
}

export default PokedexEntry;
