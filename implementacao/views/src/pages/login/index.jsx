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
    nomeUsuario: "",
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
        const resposta = await useApi.post("login", formData);
        localStorage.setItem("usuario", JSON.stringify(resposta));
        console.log(resposta, "resposta do login")
        Swal.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Sucesso',
          showConfirmButton: false,
          timer: 1000
        })
        if (resposta.data.rg) {
          navigate("/conta-aluno")
        }
        if (resposta.data.cnpj) {
          console.log("aqui")
          navigate("/home-empresa")
        }
        if (resposta.data.departamento) {
          navigate("/conta-professor")
        }

      } catch (error) {
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
    <Container component="main" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Box sx={{ display: "flex", gap: 5, borderRadius: 5, backgroundColor: "#FFFFFF", paddingLeft: 7 }}
      >
        <Box sx={{
          marginTop: 4,
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
              CONECTAR
            </Button>
            <Typography component="h1" variant="h5" sx={{ color: "#7F4AA4", marginTop: 3, fontWeight: 800, fontSize: 18 }}>
              Não tem uma conta? Cadastre-se
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/cadastro-aluno"
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
                Aluno
              </Button>

              <Button
                component={Link}
                to="/cadastro-empresa"
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
                Empresa
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="imagem-login">

        </Box>
      </Box>
    </Container>
  );
};

export default Login;