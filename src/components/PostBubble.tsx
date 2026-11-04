import { Html } from "@react-three/drei";
import "./PostBubble.css";
import blueskyLogo from "../assets/Bluesky_Logo.svg";

type PostBubbleProps = {
	post: string;
	preview: boolean;
	onMiss: () => void;
};

function PostBubble({ post, preview, onMiss }: PostBubbleProps) {
	return (
		<>
			<Html
				center
				position={[0, 0.6, 0]}
				style={{ transform: "translate(-50%, -100%)" }}
				onPointerMissed={(e) => {
					onMiss();
				}}
			>
				<div
					className={`postBubble ${preview ? "inactiveBubble" : "activeBubble"}`}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="postText">{post}</div>
				</div>
				<img className="blueskyLogo" src={blueskyLogo} />
			</Html>
		</>
	);
}

export default PostBubble;
