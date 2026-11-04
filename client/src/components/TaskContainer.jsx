import React from "react";
import Item from "./Item.jsx";

const TaskContainer = ({ allTask, deleteTask }) => {

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
    </div>
  );
};

export default TaskContainer;
