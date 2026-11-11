import { useEffect } from "react";
import "./App.css";
import Controls from "./components/Controls";
import Diploma from "./components/Diploma";
import Pokedex from "./components/Pokedex";
import Scene from "./components/Scene";
import Stats from "./components/Stats";
import useLocalStorageState from "use-local-storage-state";

const MUSIC_KEY = "pokesky:controls:music";
const CRIES_KEY = "pokesky:controls:cries";

const audioCtx = new AudioContext();
let source: AudioBufferSourceNode | null;
let playing = false;

async function playMusic() {
	if (playing) {
		return;
	}
	playing = true;
	const res = await fetch("audio/bgMusic.mp3");
	const buffer = await audioCtx.decodeAudioData(await res.arrayBuffer());
	source = audioCtx.createBufferSource();
	source.buffer = buffer;
	source.loop = true;
	source.loopStart = 1.0;
	source.loopEnd = 58.5;
	const gain = audioCtx.createGain();
	gain.gain.value = 0.25;
	source.connect(gain);
	gain.connect(audioCtx.destination);
	source.start();
}

playMusic();

const isIOS = /iPad|iPhone|iPod/.test(navigator.platform)
	|| (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

function App() {
	const [musicEnabled, setMusicEnabled] = useLocalStorageState<boolean>(
		MUSIC_KEY,
		{ defaultValue: true },
	);
	const [criesEnabled, setCriesEnabled] = useLocalStorageState<boolean>(
		CRIES_KEY,
		{ defaultValue: !isIOS },
	);

	useEffect(() => {
		const resume = () => audioCtx.resume();
		if (musicEnabled) {
			if (audioCtx.state === "suspended") {
				window.addEventListener("pointerdown", resume, { once: true });
				window.addEventListener("keydown", resume, { once: true });
			}
			audioCtx.resume();
		} else {
			audioCtx.suspend();
		}
		return () => {
			window.removeEventListener("pointerdown", resume);
			window.removeEventListener("keydown", resume);
		};
	}, [musicEnabled]);

	return (
		<>
			<Scene criesEnabled={criesEnabled} />
			<Pokedex />
			<Stats />
			<Diploma />
			<Controls
				musicEnabled={musicEnabled}
				criesEnabled={criesEnabled}
				toggleMusicEnabled={() => setMusicEnabled(prev => !prev)}
				toggleCriesEnabled={() => setCriesEnabled(prev => !prev)}
			/>
		</>
	);
}

export default App;

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		source?.stop();
		audioCtx.close();
	});
}
