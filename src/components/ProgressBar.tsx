import "./ProgressBar.css";

type ProgressBarProps = {
	label: string;
	progress: number;
	secondaryLabel: string;
	color: string;
};

function ProgressBar({ label, progress, secondaryLabel, color }: ProgressBarProps) {
	return (
		<div className="progressBarContainer">
			<div className="card progressBarOutside">
				<div className="card progressBarInside" style={{ "--card-color": color, width: `${progress * 100}%` } as React.CSSProperties}>
					<div className="progressBarLabel">
						{label}
					</div>
				</div>
				<div className="progressBarSecondaryLabel">
					{secondaryLabel}
				</div>
			</div>
		</div>
	);
}

export default ProgressBar;