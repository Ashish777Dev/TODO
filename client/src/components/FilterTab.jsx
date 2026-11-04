import React, { useContext } from "react";
import { TodoContext } from "./../context/TodoContext.jsx";
const FilterTab = () => {
  const { allTask } = useContext(TodoContext);
  const buttonNames = ["All", "Active", "Complete"];

  return (
    <div className="filter-tab">
      {buttonNames.map((name) => {
        return <button key={name}>{name}</button>;
      })}
    </div>
  );
};

export default FilterTab;
