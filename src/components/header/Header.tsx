import "./Header.scss";
import { usePostStore } from "../../store/posts-store";

export const Header: React.FC = () => {
  const filteredPosts = usePostStore((state) => state.filteredPosts);

  return (
    <div className="header">
      <p className="header__title">Posts found: {filteredPosts.length}</p>
    </div>
  );
};
