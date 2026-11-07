import "./App.css";
import Diploma from "./components/Diploma";
import Pokedex from "./components/Pokedex";
import Scene from "./components/Scene";
import Stats from "./components/Stats";

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
