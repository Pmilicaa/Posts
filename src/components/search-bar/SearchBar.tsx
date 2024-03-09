import "./SearchBar.scss";

export const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <div className="search-bar__box">
        <input
          name="search"
          className="search-bar__box__input search-bar__box__input__text"
          placeholder="Search"
        />
      </div>
      <div className="search-bar__box">
        <select
          name="selectedFruit"
          className="search-bar__box__input search-bar__box__input__text"
        >
          <option disabled selected hidden>
            Filter by author name
          </option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </div>
    </div>
  );
};
