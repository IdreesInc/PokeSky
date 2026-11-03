import { usePokemonPosts } from "../store/pokemonPostStore";
import "./PostList.css";

function PostList() {
	const posts = usePokemonPosts();

	return (
		<div className="postList">
			{posts.map((item) => (
				// <span key={item.key}>{item.text}<br/>{item.key}</span>
				<img key={item.key} src={`sprites/${item.pokedex}.png`} width="40" height="30" title={item.text}/>
			))}
		</div>
	);
}

export default PostList;
