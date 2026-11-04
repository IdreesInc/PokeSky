import { Html } from "@react-three/drei";
import "./PostBubble.css";
import blueskyLogo from "../assets/Bluesky_Logo.svg";

type PostBubbleProps = {
	post: string;
};

function PostBubble({ post }: PostBubbleProps) {
	return (
		<>
			<Html center position={[0, 1.1, 0]}>
				<div className="postBubble">
					<div className="postText">{post}</div>
				</div>
				<img className="blueskyLogo" src={blueskyLogo} />
			</Html>
		</>
	);
}

export default PostBubble;
