
function AddTodoForm () {
    return (
        <form>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm