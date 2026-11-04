import React, { useState, useEffect, createContext } from "react";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
    const [allTask, setAllTask] = useState([]);
    const [text, setText] = useState("");

    //GET ALL TASK
    const loadTask = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
            const json = await res.json();

            if (!res.ok) {
                console.log(`Failed To fetch HTTP STATUS : ${res.status}`);
            }

            setAllTask(json.data.task);
        } catch (err) {
            console.log("Failed to connect ");
        }
    };

    //CREATE TASK
    const createTask = async () => {
        if (text.trim().length === 0) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name: text })
            });
            const json = await res.json();

            if (res.ok) {
                setText("");
                setAllTask(prevTask => [...prevTask, json.data.task]);
            }
        } catch (err) {
            console.log("Failed to create Task ");
        }
    };

    //DELETE TASK
    const deleteTask = async id => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (res.ok) {
                setAllTask(prevTask =>
                    prevTask.filter(task => task._id !== id)
                );
            } else {
                console.log("Error from servef");
            }
        } catch (err) {
            console.log("Failed to delete task");
        }
    };

    //UPDATE task
    const updateTask = async (currentStatus, id) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/tasks/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ isCompleted: !currentStatus })
                }
            );
            const json = await res.json();
            if (res.ok) {
                setAllTask(prevTask =>
                    prevTask.map(task =>
                        task._id === id ? json.data.task : task
                    )
                );
            }
        } catch (err) {
            console.log("Failed to toggle task status");
        }
    };

    //DELETE all task
    const deleteAllTask = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "DELETE"
            });
            if (res.ok) {
                setAllTask([]); //Clear all tasks
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    //LOAD TASK ONCE
    useEffect(() => {
        loadTask();
    }, []);

    return (
        <TodoContext.Provider
            value={{
                allTask,
                setAllTask,
                text,
                setText,
                createTask,
                deleteTask,
                updateTask,
                deleteAllTask
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoContextProvider };
