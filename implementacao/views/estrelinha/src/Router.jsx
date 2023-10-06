import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/login"
import CadastroEmpresa from "./components/cadastro"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App