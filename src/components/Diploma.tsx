import { useState } from "react";
import { useCaught } from "../hooks/useCaught";
import "./Diploma.css";

function Diploma() {
	const [hidden, setHidden] = useState(false);
	const { caught } = useCaught();
	const allCaught = Object.keys(caught).length >= 1025;

	return (
		<>
			{!hidden && allCaught &&
				<div className="diplomaOverlay" onClick={() => setHidden(true)}>
					<img className="diploma" src="images/diploma.png" loading="lazy"></img>
				</div>
			}
		</>
	);
}

export default Diploma;
