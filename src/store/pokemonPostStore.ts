import AhoCorasick from "modern-ahocorasick";
import { getPokemon } from "../data/pokemon";
import { onEvent } from "../firehose/firehoseClient";
import type { PostEvent } from "../firehose/firehoseTypes";
import { useSyncExternalStore } from "react";
import {
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from "obscenity";

export type PokemonPost = {
	key: string;
	pokedex: number;
	text: string;
	link: string;
};

const MAX_PER_POST = 5;

let firehoseCleanup: () => void;
const listeners = new Set<() => void>();
let posts: readonly PokemonPost[] = [];
const pokemon = getPokemon();
const matchDetector = new AhoCorasick(
	pokemon.map((mon) => ({
		pattern: mon.name.toLowerCase(),
		data: mon.pokedex,
	})),
	{ boundary: "unicode" },
);
const badWordDetector = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});

function handleEvent(event: PostEvent) {
	const contents = event.contents.toLowerCase();
	if (badWordDetector.hasMatch(contents)) {
		return;
	}
	const matches = matchDetector.search(contents, {
		strategy: "leftmost-longest",
	});
	const deduped = new Set(matches.map((match) => match.data));
	let count = 0;
	for (const pokedex of deduped) {
		if (count++ >= MAX_PER_POST) {
			break;
		}
		posts = [
			...posts,
			{
				key: event.id + "/" + pokedex,
				pokedex: pokedex as number,
				text: event.contents,
				link: event.link,
			},
		];
		for (const listener of listeners) {
			listener();
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
