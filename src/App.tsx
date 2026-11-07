import "./App.css";
import Diploma from "./components/Diploma";
import Pokedex from "./components/Pokedex";
import Scene from "./components/Scene";
import Stats from "./components/Stats";

const audioCtx = new AudioContext();
let source: AudioBufferSourceNode | null;
let playing = false;

if (audioCtx.state === "suspended") {
	// Play on interaction
	const resume = () => audioCtx.resume();
	window.addEventListener("pointerdown", resume, { once: true });
	window.addEventListener("keydown", resume, { once: true });
}

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
	source.loopStart = 58.5;
	source.loopEnd = 3000;
	source.connect(audioCtx.destination);
	source.start();
}

playMusic();

function App() {
	return (
		<>
			<Scene />
			<Pokedex />
			<Stats />
			<Diploma />
		</>
	);
}

export default App;

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		source?.stop();
		audioCtx.close();
	})
}