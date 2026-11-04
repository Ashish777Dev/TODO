import React, { useState, useContext } from "react";
import "./Checkbox.css";
import { TodoContext } from "./../../context/TodoContext.jsx";
const Checkbox = ({ id, isCompleted }) => {
    const { updateTask } = useContext(TodoContext);

    
    
    return (
        <div className="checkbox">
            <div className="wrapper">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={()=>updateTask(isCompleted, id)}
                />
                <div className="checkmark">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Checkbox;
