import React from "react";
import PizzaCategories from "../PizzaCategories";
import PizzaSearch from "../PizzaSearch";
import PizzaSort from "../PizzaSort";
import st from "./SortingTypes.module.scss";

const SortingTypes = () => {
    return (
        <nav className={st.wrapper}>
            <PizzaSearch />
            <PizzaCategories />
            <PizzaSort />
        </nav>
    );
};

export default SortingTypes;
