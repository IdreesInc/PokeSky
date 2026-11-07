import "./App.css";
import Pokedex from "./components/Pokedex";
import Scene from "./components/Scene";
import Stats from "./components/Stats";

function App() {
	return (
		<>
			<Scene />
			<Pokedex />
			<Stats />
		</>
	);
}

export default App;
