import { getPokemon } from "../data/pokemon";
import { useCaught } from "../hooks/useCaught";
import OverallProgress from "./RankProgress";
import ProgressBar from "./ProgressBar";
import "./Stats.css";
// const colors = [
// 	// "#5e77f2",
// 	"#7779d8",
// 	"#5390d9",
// 	"#48bfe3",
// 	"#74dfff",
// 	"#80fffd",
// 	"#80ffdb",
// 	"#ffcbf2",
// 	"#ff95f6",
// 	"#c395ff"
// ]

// const colors = [
// 	"#ff006e",
// 	"#ff0d00",
// 	"#fb5607",
// 	"#ffbe0b",
// 	"#50ec38",
// 	"#38eca4",
// 	"#38ecec",
// 	"#3a86ff",
// 	"#6838ec",
// ].reverse();

const colors = [
	"#b813ff",
	"#1584f9",
	"#ffa807",
	"#f6226c",
	"#896161",
	"#ba2b9b",
	"#1634f9",
	"#ce8a24",
	"#d21414",
];

const generations = [
	"Red & Blue",
	"Gold & Silver",
	"Ruby & Sapphire",
	"Diamond & Pearl",
	"Black & White",
	"X & Y",
	"Sun & Moon",
	"Sword & Shield",
	"Scarlet & Violet",
];

function Stats() {
	const totalPerGen = new Array(10).fill(0);
	const caughtPerGen = new Array(10).fill(0);
	const { caught } = useCaught();
	for (const mon of getPokemon()) {
		totalPerGen[mon.generation]++;
		if (caught[mon.pokedex]) {
			caughtPerGen[mon.generation]++;
		}
	}

	return (
		<div className="stats">
			<div className="card genStats">
				{generations
					.map((label, index) => ({ label, generation: index + 1 }))
					.reverse()
					.map(({ label, generation }, index) => {
						const caught = caughtPerGen[generation];
						const total = totalPerGen[generation];
						return (
							<ProgressBar
								key={index}
								label={label}
								progress={caught / total}
								secondaryLabel={caught + "/" + total}
								color={colors[index % colors.length]}
							/>
						);
					})}
			</div>
			<div className="rightStats">
				<div className="card catchStats">
					<OverallProgress />
				</div>
				<div className="card bioStats">
					<div>Made by <a href="https://idreesinc.com" target="_blank">Idrees Hassan</a>, follow along <a href="https://bsky.app/profile/idreesinc.com" target="_blank">@idreesinc.com</a></div>
					<div>Designed and developed by hand ♡</div>
					<div>Source code: <a href="https://github.com/IdreesInc/PokeSky" target="_blank">github.com/IdreesInc/PokeSky</a></div>
					<div style={{ fontStyle: "italic", fontSize: "16px" }}>Pokémon, names, sprites, and the assets used in this project are solely owned by the Pokémon Company, Game Freak, and Nintendo. This project is unaffiliated with the aforementioned companies.</div>
					<div className="statsLinks">
						<a href="https://discord.gg/6yxE9prcNc" target="_blank">Projects Discord</a>
						<a href="https://idreesinc.com" target="_blank">Personal Website</a>
						<a href="https://bsky.app/profile/idreesinc.com" target="_blank">Bluesky</a>
						<a href="https://github.com/idreesinc" target="_blank">GitHub</a>
						<a href="https://idreesinc.com/privacy-policy.html" target="_blank">Privacy Policy</a>
					</div>
				</div>
			</div>
		</div >
	);
}

export default Stats;
