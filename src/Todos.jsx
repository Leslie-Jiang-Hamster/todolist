import { useState } from "react";

class Todo {
  constructor(text, active) {
    this.timestamp = Date.now();
    this.text = text;
    this.active = active;
  }
  replicate() {
    const newTodo = new Todo(this.text, this.active)
    newTodo.timestamp = this.timestamp
    return newTodo
  }
  complete() {
    const newTodo = this.replicate()
    newTodo.active = false
    return newTodo
  }
  flip() {
    const newTodo = this.replicate()
    newTodo.active =!newTodo.active
    return newTodo
  }
  _active() {
    return this.complete().flip()
  }
  change(text) {
    const newTodo = this.replicate()
    newTodo.text = text
    return newTodo
  }
}

export default function Todos() {
  const [todos, setTodos] = useState([])
  const [newText, setNewText] = useState('')
  const [display, setDisplay] = useState('All')
  const filterByDisplay = () => {
    switch (display) {
      case 'Active':
        return todos.filter(todo => todo.active)
      case 'Completed':
        return todos.filter(todo => !todo.active)
      default:
        return todos
    }
  }
  const addTodo = (text) => {
    setTodos([...todos, new Todo(text, true)])
  }
  const deleteTodo = (timestamp) => {
    setTodos(todos.filter(todo => todo.timestamp !== timestamp))
  }
  const flipTodo = (timestamp) => {
    setTodos(todos.map(todo => todo.timestamp !== timestamp ? todo : todo.flip()))
  }
  const changeTodo = (timestamp, text) => {
    setTodos(todos.map(todo => todo.timestamp !== timestamp ? todo : todo.change(text)))
  }
  const completeAll = () => {
    setTodos(todos.map(todo => todo.complete()))
  }
  const activeAll = () => {
    setTodos(todos.map(todo => todo._active()))
  }
  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.active))
  }
  const isAllCompleted = () => {
    return todos.every(todo => !todo.active)
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter' && newText) {
      addTodo(newText)
      setNewText('')
    }
  }
  return (
    <div className="todos">
      <div className="u-container">
        <button onClick={() => isAllCompleted() ? activeAll() : completeAll()}>﹀</button>
        <input type="text" value={newText} 
        placeholder="What needs to be done?"
        onChange={(e) => setNewText(e.target.value)}
        onKeyDown={handleEnter}/>
      </div>
      {
        filterByDisplay().map(todo => {
          return (
            <li className="u-container" key={todo.timestamp}>
              <button onClick={() => flipTodo(todo.timestamp)}>{todo.active? null : '✔'}</button>
              <input type="text" value={todo.text} onChange={(e) => changeTodo(todo.timestamp, e.target.value)}/>
              <button onClick={() => deleteTodo(todo.timestamp)}>×</button>
            </li>
          )
        })
      }
      <div className="u-container">
        <p>{todos.length} item{todos.length > 1 ? 's' : ''} left</p>
        <button className={display === 'All' ? 'u-red-border' : ''} onClick={() => setDisplay('All')}>All</button>
        <button className={display === 'Active' ? 'u-red-border' : ''} onClick={() => setDisplay('Active')}>Active</button>
        <button className={display === 'Completed' ? 'u-red-border' : ''} onClick={() => setDisplay('Completed')}>Completed</button>
        <button onClick={() => clearCompleted()}>Clear Completed</button>
      </div>

      <div className="u-container"></div>
      <div className="u-container"></div>
      <div className="u-container"></div>
    </div>
  )
}