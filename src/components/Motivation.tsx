import "./Motivation.css";
import { useCaught } from "../hooks/useCaught";

const MESSAGES: [number, string][] = [
	[0, "Looks like your adventure is just beginning!"],
	[12, "Over a dozen Pokémon caught, look at you go!"],
	[50, "You are \"catching\" on pretty quickly! Get it?"],
	[100, "You've already reached 100, impressive!"],
	[150, "The goal may seem far away, but look how far you've already come!"],
	[200, "Wow! You've reached 200! Your Pokédex is looking great!"],
	[250, "About a quarter of the way there, don't get discouraged yet!"],
	[300, "Your Pokédex is really filling up. Keep up the good work!"],
	[400, "One can only marvel at the diversity of Pokémon!"],
	[513, "You are over halfway there, keep up the good work Trainer!"],
	[600, "Wow, 600! You're a Pokémon catching pro!"],
	[650, "Almost 700...Just a little bit more! Keep it up!"],
	[700, "I didn't even realize there were so many Pokémon in the world!"],
	[750, "Three quarters of the way there already, well done! Don't give up yet!"],
	[800, "Wow, you've gotten so far! I'm actually a little surprised!"],
	[900, "Only a little bit further, and you'll have found every Pokémon there is to see!"],
	[1000, "Congratulations on reaching 1000 Pokémon discovered, you're nearly there!"],
	[1025, "Well done, you've officially caught them all! Thanks for playing my game!"]
];

function Motivation() {
	const { caught } = useCaught();
	const amountCaught = Object.keys(caught).length;
	let message = "";
	for (const entry of MESSAGES) {
		if (amountCaught <= entry[0]) {
			break;
		}
		message = entry[1];
	}
	return (<div className="motivation">
		{message}
	</div>);
}

export default Motivation;