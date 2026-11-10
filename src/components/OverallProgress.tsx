import { useCaught } from "../hooks/useCaught";
import Motivation from "./Motivation";
import "./OverallProgress.css";

const RANKS = [
	"Poke",
	"Nest",
	"Net",
	"Quick",
	"Repeat",
	"Great",
	"Heal",
	"Dusk",
	"Fast",
	"Dive",
	"Premier",
	"Friend",
	"Heavy",
	"Ultra",
	"Love",
	"Moon",
	"Timer",
	"Luxury",
	"Dream",
	"Beast",
	"Cherish",
	"Master",
];

const TOTAL_POKEMON = 1025;
const RANK_INCR = 50;

function OverallProgress() {
	const { caught } = useCaught();
	const amountCaught = Object.keys(caught).length;
	const complete = amountCaught === TOTAL_POKEMON;
	const last = RANKS.length - 2;
	const rankIndex = complete ? RANKS.length - 1 : Math.min(last, Math.floor(amountCaught / RANK_INCR));
	const rank = RANKS[rankIndex];
	const rankStart = rankIndex * RANK_INCR;
	const rankEnd = rankIndex === last ? TOTAL_POKEMON : rankStart + RANK_INCR;
	const progress = complete ? 100 : (amountCaught - rankStart) / (rankEnd - rankStart) * 100;

	return (<div className="progressContainer" title={amountCaught + " / " + TOTAL_POKEMON}>
		<div className="ballWrapper">
			<svg width="180" height="180" viewBox="0 0 180 180" className="circular-progress" style={{ "--progress": progress } as React.CSSProperties}>
				<defs>
					<linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#fcbe84" />
						<stop offset="100%" stopColor="#fc84d4" />
					</linearGradient>
				</defs>
				<circle className="bg"></circle>
				{progress !== 0 && <circle className="fg"></circle>}
			</svg>
			<img className="ball" src={`balls/Bag_${rank}_Ball_SV_Sprite.png`}></img>
		</div>
		<div className="progressText">
			<Motivation />
			<div className="rank">
				Rank: {rank} Ball
			</div>
		</div>
	</div>);
}

export default OverallProgress;