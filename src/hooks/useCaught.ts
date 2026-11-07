import useLocalStorageState from "use-local-storage-state";

type Catch = {
	time: number;
	postUrl: string;
};

const KEY = "pokesky:pokemon:caught";

export function useCaught() {
	const [caught, setCaught] = useLocalStorageState<
		Partial<Record<number, Catch>>
	>(KEY, {
		defaultValue: {},
	});

	function catchPokemon(pokedex: number, postUrl: string) {
		setCaught((prev) => ({
			...prev,
			[pokedex]: { time: Date.now(), postUrl },
		}));
		console.log(Object.keys(caught).length + " / 1025");
	}

	return { caught, catchPokemon };
}
