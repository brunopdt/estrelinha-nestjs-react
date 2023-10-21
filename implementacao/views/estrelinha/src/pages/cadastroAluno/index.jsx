import { Button, TextField, Box, Typography, Container, Autocomplete } from "@mui/material"
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api/axiosInstance";
import Swal from "sweetalert2";

const CadastroAluno = () => {
  const getCursoOptions = useCallback(async () => {
    try {
      const cursos = await useApi.get("/curso");
      console.log(cursos)
      setCursoOptions(cursos.data);
      setCurso(cursos.data[0]);
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao carregar as opções de curso'
      })
    }
  }, []);

  const [curso, setCurso] = useState({});
  const [cursoOptions, setCursoOptions] = useState([]);

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
        console.log({ ...formData, cursoId: curso.id, instituicaoId: curso.instituicaoId })
        const resposta = await useApi.post("/aluno", { ...formData, cursoId: curso.id, instituicaoId: curso.instituicaoId });
        localStorage.setItem("usuario", JSON.stringify(resposta));
        navigate("/");
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Confira os dados preenchidos'
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData, navigate]
  );

  useEffect(() => {
    getCursoOptions();
  }, [getCursoOptions]);

  return (
    <Container component="main" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}} >
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
            {cursoOptions.length > 0 ? (
              <Autocomplete
                disablePortal
                options={cursoOptions}
                getOptionLabel={(option) => option ? option.nome : ''}
                isOptionEqualToValue={(option, value) => {
                  if (!value || !option) {
                    return value === option;
                  }
                  return option.id === value.id;
                }}
                value={curso}
                onChange={(_, newValue) => {
                  setCurso(newValue);
                }}
                renderInput={(params) => <TextField margin="normal" {...params} label="Curso" />}
              />
            ) : (
              <div>Loading curso options...</div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 1, backgroundColor: "#FBB80F", color: "#7F4AA4", fontWeight: 800, ":hover": {
                  backgroundColor: '#7F4AA4', color: '#FBB80F'
                }
              }}
            >
              CADASTRAR
            </Button>
            <Button
              onClick={() => navigate("/")}
              fullWidth
              variant="text"
              sx={{
                mb: 3, fontWeight: 800, color: "#7F4AA4"
              }}
            >
              LOGIN
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