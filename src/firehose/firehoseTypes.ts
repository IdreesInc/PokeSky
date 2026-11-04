export type WorkerMessage = {
	type: "start";
};

export type PostEvent = {
	id: string;
	contents: string;
	link: string
};