import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/login"
import CadastroEmpresa from "./components/cadastroEmpresa"
import CadastroAluno from "./components/cadastroAluno"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
        <Route path="/cadastro-aluno" element={<CadastroAluno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App