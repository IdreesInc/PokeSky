import "./Controls.css";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";

type ControlsProps = {
	musicEnabled: boolean;
	toggleMusicEnabled: () => void;
	criesEnabled: boolean;
	toggleCriesEnabled: () => void;
};

function Controls({ musicEnabled, toggleMusicEnabled, criesEnabled, toggleCriesEnabled }: ControlsProps) {
	return (
		<div className="controls">
			<div className="control" onClick={toggleMusicEnabled} title={(musicEnabled ? "Mute" : "Unmute") + " Music"}>
				{musicEnabled ? <MdMusicNote size={40} /> : <MdMusicOff size={40} />}
			</div>
			<div className="control" onClick={toggleCriesEnabled} title={(criesEnabled ? "Mute" : "Unmute") + " Cries"}>
				{criesEnabled ? <HiMiniSpeakerWave size={40} /> : <HiMiniSpeakerXMark size={40} />}
			</div>
		</div>
	);
}

export default Controls;