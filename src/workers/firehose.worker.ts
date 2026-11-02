import { Jetstream } from "@bsky/jetstream";
import type { WorkerMessage, WorkerResponse } from "../types/firehose";

function send(message: WorkerResponse) {
	self.postMessage(message);
}

function handleMessage(event: MessageEvent<WorkerMessage>) {
	if (event.data.type === "start") {
		start();
	}
}

async function start() {
	try {
		const jetstream = new Jetstream("https://jetstream.us-east.bsky.network");
		for await (const event of jetstream.live({ collections: ['app.bsky.feed.post'] })) {
			send({ type: "event", contents: event.kind });
		}
	} catch (e) {
		console.error(e);
	}
}

self.addEventListener("message", handleMessage);