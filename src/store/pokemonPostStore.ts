import { getPokemon } from "../data/pokemon";
import { onEvent } from "../firehose/firehoseClient";
import type { PostEvent } from "../firehose/firehoseTypes";
import { useSyncExternalStore } from "react";

export type PokemonPost = {
	key: string;
	pokedex: number;
	text: string;
};

let firehoseCleanup: () => void;
const listeners = new Set<() => void>();
let posts: readonly PokemonPost[] = [];

function handleEvent(event: PostEvent) {
	const contents = event.contents.toLowerCase();
	const pokemon = getPokemon();
	for (const mon of pokemon) {
		for (const text of mon.matches) {
			if (contents.includes(text)) {
				console.log(event.contents + "\n" + text);
				posts = [
					...posts,
					{
						key: event.id + "/" + mon.pokedex,
						pokedex: mon.pokedex,
						text: event.contents,
					},
				];
				for (const listener of listeners) {
					listener();
				}
			}
		}
	}
}

export function subscribe(listener: () => void) {
	if (!firehoseCleanup) {
		firehoseCleanup = onEvent(handleEvent);
	}
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function getSnapshot() {
	return posts;
}

export function usePokemonPosts() {
	return useSyncExternalStore(subscribe, getSnapshot);
}