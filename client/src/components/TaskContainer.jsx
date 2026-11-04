import React from "react";
import Item from "./Item.jsx";
import FilterTab from "./FilterTab.jsx";
const TaskContainer = ({ allTask, deleteTask, deleteAllTask }) => {
  const itemLeft = allTask.filter((task) => !task.isCompleted);
  return (
    <div className="task-container">
      <ul>
        {allTask.length !== 0 ? (
          allTask.map((task) => {
            return (
              <Item
                key={task._id}
                id={task._id}
                deleteTask={deleteTask}
                task={task.name}
                isCompleted={task.isCompleted}
              />
            );
          })
        ) : (
          <h2 className="no-content">
            "Clean slate, big dreams. What's next? 📝💫"
          </h2>
        )}
      </ul>
      {allTask.length !== 0 ? (
        <div className="task-status">
          <p>{itemLeft.length} items left</p>
          <FilterTab />
          <button onClick={() => deleteAllTask()}>Clear Completed</button>
        </div>
      ) : null}
    </div>
  );
};

export default TaskContainer;
