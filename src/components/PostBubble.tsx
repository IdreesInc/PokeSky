import { Html } from "@react-three/drei";
import "./PostBubble.css";
import blueskyLogo from "../assets/Bluesky_Logo.svg";
import type { PokemonPost } from "../store/pokemonPostStore";

type PostBubbleProps = {
	post: PokemonPost;
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
				onPointerMissed={() => {
					onMiss();
				}}
			>
				<div
					className={`card postBubble ${preview ? "inactiveBubble" : "activeBubble"}`}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="postText">{post.text}</div>
				</div>
				<a href={post.link} target="_blank" rel="noopener noreferrer">
					<img className="blueskyLogo" src={blueskyLogo} />
				</a>
			</Html>
		</>
	);
}

export default PostBubble;
