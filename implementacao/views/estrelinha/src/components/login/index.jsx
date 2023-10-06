
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useApi } from "../../api/axiosInstance";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    senha: "",
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
        const resposta = await useApi.post("/usuarios/login", formData);
        console.log(resposta);
        localStorage.setItem("usuario", JSON.stringify(resposta));
        navigate("/listaPedidos");
      } catch (error) {
        console.error("Erro:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário inválido',
        })
      }
    },
    [formData, navigate]
  );

  return (
    <Container component="main" sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", gap: 5, borderRadius: 5, backgroundColor: "#FFFFFF", paddingLeft: 7 }}
      >
        <Box sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 350
        }}>
          <Typography component="h1" variant="h2" sx={{ color: "#FBB80F", marginTop: 7, fontFamily: "Shantell Sans" }}>
            Conectar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome de Usuário"
              name="login"
              value={formData.login}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2, backgroundColor: "#FBB80F", color: "#7F4AA4", fontWeight: 800, ":hover": {
                  backgroundColor: '#7F4AA4', color: '#FBB80F'
                }
              }}
            >
              LOGAR
            </Button>

            <Button
              component={Link}
              to="/cadastro"
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 1, mb: 2, backgroundColor: "#FBB80F", color: "#7F4AA4", fontWeight: 800,
                ":hover": {
                  backgroundColor: '#7F4AA4', color: '#FBB80F'
                }
              }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
        <Box className="imagem-login">

        </Box>
      </Box>
    </Container>
  );
};

export default Login;