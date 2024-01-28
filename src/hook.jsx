import { useState, useEffect } from "react"
export function useInput(initial, callback) {
  const [newText, setNewText] = useState(initial)
  const handleChange = (e) => setNewText(e.target.value)
  const handleEnter = (e) => {
    if (e.key === 'Enter' && newText) {
      callback(newText)
      setNewText('')
    }
  }
  return [newText, handleChange, handleEnter]
}
export function useLocalStorage(initial) {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todos')) || initial
    }
    catch (e) {
      return initial
    }
  })
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  return [todos, setTodos]
}