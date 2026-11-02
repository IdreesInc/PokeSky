import { useEffect } from "react";
import type { WorkerMessage, WorkerResponse } from "./types/firehose";
import "./App.css";

function App() {
	useEffect(() => {
		const worker = new Worker(new URL("./workers/firehose.worker.ts", import.meta.url), { type: "module"});
		worker.postMessage({type: "start"} satisfies WorkerMessage);
		worker.addEventListener("message", (event: MessageEvent<WorkerResponse>) => {
			console.log(event.data.contents);
		});
		return () => {
			worker.terminate();
		};
	}, []);

	return (
		<>
			Hello, World!
		</>
	)
}

export default App
