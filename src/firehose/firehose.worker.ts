import { Jetstream } from "@bsky/jetstream";
import type { WorkerMessage, PostEvent } from "./firehoseTypes";

function send(message: PostEvent) {
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
			if (event.kind === "commit" && event.commit.operation === "create") {
				send({id: event.did + "/" + event.commit.rkey, contents: event.commit.record.text + "" });
			}
		}
	} catch (e) {
		console.error(e);
	}
}

self.addEventListener("message", handleMessage);