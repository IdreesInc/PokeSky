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
	"Heavy",
	"Ultra",
	"Love",
	"Moon",
	"Luxury",
	"Dream",
	"Beast",
	"Cherish",
	"Master",
];

function OverallProgress() {
	const { caught } = useCaught();
	const amountCaught = Object.keys(caught).length;
	const rankVal = amountCaught * RANKS.length / 1025;
	const rankIndex = Math.min(RANKS.length - 1, Math.floor(rankVal));
	const rank = RANKS[rankIndex];

	return (<div className="progressContainer" title={amountCaught + " / 1025"}>
		<div className="ballWrapper">
			<svg width="180" height="180" viewBox="0 0 180 180" className="circular-progress" style={{ "--progress": (rankVal - rankIndex) * 100 } as React.CSSProperties}>
				<defs>
					<linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#fcbe84" />
						<stop offset="100%" stopColor="#fc84d4" />
					</linearGradient>
				</defs>
				<circle className="bg"></circle>
				<circle className="fg"></circle>
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