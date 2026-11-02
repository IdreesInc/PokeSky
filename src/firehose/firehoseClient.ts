import type { WorkerMessage, WorkerResponse } from "./firehoseTypes";

const listeners = new Set<(event: WorkerResponse) => void>();
let worker: Worker | null = null;

function start() {
	if (worker) {
		return;
	}
	worker = new Worker(new URL("./workers/firehose.worker.ts", import.meta.url), { type: "module"});
	worker.postMessage({type: "start"} satisfies WorkerMessage);
	worker.addEventListener("message", (event: MessageEvent<WorkerResponse>) => {
		for (const listener of listeners) {
			listener(event.data);
		}
	});
}

export function onEvent(listener: (event: WorkerResponse) => void) {
	listeners.add(listener);
	if (listeners.size === 1) {
		start();
	}
	return () => {
		listeners.delete(listener);
		if (listeners.size === 0) {
			stop();
		}
	};
}

function stop() {
	if (worker) {
		worker.terminate();
		worker = null;
	}
}

if (import.meta.hot) {
	import.meta.hot.dispose(stop);
}