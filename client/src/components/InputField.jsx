import React, { useContext } from "react";
import { TodoContext } from "./../context/TodoContext.jsx";
const InputField = () => {
  const { text, setText, setAllTask, createTask } = useContext(TodoContext);
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  return (
    <div className="input-field">
      <span className="border-circle"></span>
      <input
        type="text"
        value={text}
        placeholder="Create a new todo..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default InputField;
