import { useEffect } from "react";
import "./App.css";
import { onEvent } from "./firehose/firehoseClient";

function App() {
	useEffect(() => {
		return onEvent((event) => {
			console.log(event.contents);
		});
	}, []);

	return (
		<>
			Hello, World!
		</>
	)
}

export default App
