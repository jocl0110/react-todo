
function AddTodoForm (props) {
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.elements.title.value;
        console.log(todoTitle)
        props.onAddTodo(todoTitle)
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title" required/>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm