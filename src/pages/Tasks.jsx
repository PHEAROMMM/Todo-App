import { useTasks } from "../context/TaskContext";

export default function Tasks() {
    const { state, dispatch } = useTasks();

    return (
        <>
            <h1>Tasks ({state.tasks.length})</h1>
            <button
                onClick={() =>
                    dispatch({
                        type: "ADD",
                        task: { id: crypto.randomUUID(), title: "Test", done: false },
                    })
                }>Add test task
            </button>

            { state.lastDeleted && (
                <div>
                    <span>Deleted "{state.lastDeleted.title}"</span>
                    <button onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
                </div>
            )} 

            {state.tasks.length === 0 ? <p>No tasks yet</p> : 
            (
                <ul>
                    {state.tasks.map(task => (
                        <li key={task.id}>
                            <input type="checkbox"
                            checked={task.done}
                            onChange={() => dispatch({type: "TOGGLE", id: task.id })} />
                            <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                                {task.title}
                            </span>
                            <button onClick={() => dispatch({ type: "DELETE", id: task.id })}>
                                Delete
                            </button>
                            
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}