import "./Header.scss";
import { usePostStore } from "../../store/posts-store";

export const Header: React.FC = () => {
  const posts = usePostStore((state) => state.posts);

  return (
    <div className="header">
      <p className="header__title">Posts found: {posts.length}</p>
    </div>
  );
};
