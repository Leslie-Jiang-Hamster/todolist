import Title from "./Title"
import Footer from "./Footer"
import Todos from "./Todos"
function App() {
  return (
    <main className="app">
      <Title>todos</Title>
      <Todos></Todos>
      <Footer>Click to edit a todo</Footer>
      <Footer>Created by the TodoMVC Team</Footer>
      <Footer>Part of TodoMVC</Footer>
    </main>
  )
}

export default App
