import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import CadastroEmpresa from "./pages/cadastroEmpresa"
import CadastroAluno from "./pages/cadastroAluno"
import ContaProfessor from "./pages/contaProfessor"
import ContaAluno from "./pages/contaAluno"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
        <Route path="/cadastro-aluno" element={<CadastroAluno />} />
        <Route path="/conta-professor" element={<ContaProfessor />} />
        <Route path="/conta-aluno" element={<ContaAluno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App