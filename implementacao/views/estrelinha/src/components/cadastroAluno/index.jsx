
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "../../api/axiosInstance";
import Swal from "sweetalert2";

const CadastroAluno = () => {
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    senha: "",
    cpf: "",
    rg: "",
    nome: "",
    email: "",
    endereco: "",
  });

  const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = useCallback(
      async (e) => {
        e.preventDefault();
        try {
          console.log(formData)
          const resposta = await useApi.post("/aluno", formData);
          console.log(resposta);
          localStorage.setItem("usuario", JSON.stringify(resposta));
          navigate("/listaPedidos");
        } catch (error) {
          console.error("Erro:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Confira os dados preenchidos'
          })
        }
      },
      [formData, navigate]
    );

    return(
    <Container component = "main" sx = {{ display: "flex", alignItems: "center" }} >
    <Box sx={{ display: "flex", gap: 10, borderRadius: 5, backgroundColor: "#FFFFFF", paddingLeft: 7 }}
    >
      <Box sx={{
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 350
      }}>
        <Typography component="h1" variant="h2" sx={{ color: "#FBB80F", fontFamily: "Shantell Sans", fontSize: 30, margin: -2 }}>
          Cadastro Aluno
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome de Usuário"
              name="nomeUsuario"
              value={formData.nomeUsuario}
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}

            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}

          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nomeFantasia}
            autoFocus
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="CPF"
              name="cpf"
              value={formData.nomeFantasia}
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="rg"
              label="RG"
              type="text"
              value={formData.cnpj}
              onChange={handleChange}

            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            name="endereco"
            label="Endereço"
            type="text"
            value={formData.endereco}
            onChange={handleChange}

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3, mb: 2, backgroundColor: "#FBB80F", color: "#7F4AA4", fontWeight: 800,
              marginTop: 1, ":hover": {
                backgroundColor: '#7F4AA4', color: '#FBB80F'
              }
            }}
          >
            CADASTRAR
          </Button>
        </Box>
      </Box>
      <Box className="imagem-cadastro">

      </Box>
    </Box>
    </Container >
  );
};

export default CadastroAluno;