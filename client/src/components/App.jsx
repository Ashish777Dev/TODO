import { useContext } from "react";
import Header from "./Header.jsx";
import InputField from "./InputField.jsx";
import TaskContainer from "./TaskContainer.jsx";
import FilterTab from "./FilterTab.jsx";
import { TodoContext } from "./../context/TodoContext.jsx";
function App() {
  const { allTask, deleteTask, deleteAllTask } = useContext(TodoContext);
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    alert(e.target.id);
  };
  return (
    <div className="App">
      <div className="wrapper-1">
        <Header />
        <InputField />
      </div>
      <TaskContainer
        allTask={allTask}
        deleteTask={deleteTask}
        deleteAllTask={deleteAllTask}
      />
      {/* <FilterTab /> */}

      {/* <div
        id="item"
        className="drag-item"
        draggable={true}
        onDragStart={handleDragStart}
      >
        Draggable Item
      </div> */}
    </div>
  );
}

export default App;
