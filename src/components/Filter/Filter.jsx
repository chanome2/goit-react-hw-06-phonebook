import css from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import { getFilter } from "../../redux/selectors";

export const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    //filter name based on the search keyword
    const handleFilterChange = e => {
        dispatch(setFilter(e.target.value));
    };

    return (
        <div className={css.container}>
            <p>Find Contacts by Name</p>
            <input
                type="text"
                name="filter"
                placeholder="Search by name"
                value={filter}
                onChange={handleFilterChange}
            />
        </div>
    );
};