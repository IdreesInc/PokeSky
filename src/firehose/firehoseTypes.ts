export type WorkerMessage = {
	type: "start";
};

export type WorkerResponse = {
	type: "event",
	contents: string
};