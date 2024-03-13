
function AddTodoForm (props) {
    const handleAddTodo = (event) => {
        const todoTitle = event.target.elements.title.value;
        console.log(todoTitle)
        props.onAddTodo(todoTitle)
        event.preventDefault();
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title"/>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm