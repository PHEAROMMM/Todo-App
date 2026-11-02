import { createContext, useReducer, useEffect, useContext } from "react";

const TaskContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "ADD":
            return { ...state, tasks: [...state.tasks, action.task] };
        case "TOGGLE":
            return {
                ...state,
                tasks: state.tasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
            };
        case "DELETE":
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.id)
            };
        case "EDIT":
            return {
                ...state,
                tasks: state.tasks.map(t => t.id === action.id ? { ...t, ...action.changes } : t)
            };
        default:
            return state;
    }
}

const DEFAULT_STATE = { tasks: [], categories: [] };

function loadState() {
    try {
        const saved = localStorage.getItem("todo-app");
        return saved ? JSON.parse(saved) : DEFAULT_STATE;
    } catch {
        return DEFAULT_STATE;
    }
}

export function TaskProvider({ children }) {
    const [state, dispatch] = useReducer (reducer, null, loadState);
    
    useEffect(() => {
        localStorage.setItem("todo-app", JSON.stringify(state));
    }, [state]);

    return (
        <TaskContext.Provider value = {{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}