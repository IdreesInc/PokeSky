import { useCaught } from "../hooks/useCaught";
import Motivation from "./Motivation";
import "./OverallProgress.css";

function OverallProgress() {
	const { caught } = useCaught();
	const amountCaught = Object.keys(caught).length;

	return (<div className="progressContainer">
		<div className="ballWrapper">
			<svg width="180" height="180" viewBox="0 0 180 180" className="circular-progress" style={{ "--progress": Math.floor(amountCaught / 1025 * 100) }}>
				<defs>
					<linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#fcbe84" />
						<stop offset="100%" stopColor="#fc84d4" />
					</linearGradient>
				</defs>
				<circle className="bg"></circle>
				<circle className="fg"></circle>
			</svg>
			<img className="ball" src="balls/Bag_Dream_Ball_SV_Sprite.png"></img>
		</div>
		<div className="progressText">
			<Motivation />
			<div className="rank">
				Rank: Dream Ball
			</div>
		</div>
	</div>);
}

export default OverallProgress;