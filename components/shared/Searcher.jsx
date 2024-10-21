import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../Slices/dataSlice";

function Searcher() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.data.searchValue);
  const onSearchValueChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };
  return (
    <div className="w-full">
      <input
        className="admin-searcher"
        type="text"
        placeholder="Buscar"
        onChange={onSearchValueChange}
        value={searchValue}
      />
    </div>
  );
}

export { Searcher };
