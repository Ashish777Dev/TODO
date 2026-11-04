import React from "react";
import Checkbox from "./checkbox/Checkbox.jsx";

const Item = ({ id, task, deleteTask, isCompleted }) => {
    return (
        <li className="item" draggable="true">
            <Checkbox id={id} isCompleted={isCompleted}/>
            <p className={`task-txt ${isCompleted ? "completed" : ""}`}>
                {task}
            </p>
            <button className="delete-btn" onClick={() => deleteTask(id)}>

            </button>
        </li>
    );
};

export default Item;
