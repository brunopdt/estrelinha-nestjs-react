import {Button, TextField, Box, Typography, Container, Autocomplete} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "../../api/axiosInstance";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const FormEnvioEstrelas = ({setOpendialog}) => {
  const [formData, setFormData] = useState({
    valor: 1,
    descricao: "",
  });

  const [aluno, setAluno] = useState({});
  const [alunoOptions, setAlunoOptions] = useState([]);

  const getAlunoOptions = useCallback(async () => {
    try {
      const alunos = await useApi.get("/aluno");
      setAlunoOptions(alunos.data);
      setAluno(alunos.data[0]);
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao carregar as opções de Aluno'
      })
    }
  }, []);

  useEffect(() => {
    getAlunoOptions();
  }, [getAlunoOptions]);

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
        const professorCpf = JSON.parse(localStorage.getItem("usuario")).data.cpf
        console.log("Data Transacao",{ valor: Number(formData.valor),alunoCpf: aluno.cpf, professorCpf: professorCpf })
        const resposta = await useApi.post("/professor/premiar",{ valor: Number(formData.valor),alunoCpf: aluno.cpf, professorCpf: professorCpf, descricao: formData.descricao  });

        Swal.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Sucesso',
          showConfirmButton: false,
          timer: 1000
        })

        setOpendialog(false);

        if (resposta.data.rg) {
          navigate("/conta-aluno")
        }

      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Erro: ${error.response.data.message}`,
        })
        setOpendialog(false);
      }
    },
    [aluno.cpf, formData.descricao, formData.valor, navigate, setOpendialog]
  );

  return (
    <Container component="main" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ display: "flex", borderRadius: 5, backgroundColor: "#FFFFFF" }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 350
        }}>
          <Typography component="h2" variant="h3" sx={{ color: "#FBB80F", fontFamily: "Shantell Sans", fontSize: "35px" }}>
            Enviar Estrelas
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
              type="number"
              sx={{width: "350px"}}
              label="Quantidade de Estrelas"
              name="valor"
              value={formData.valor}
              autoFocus
              onChange={handleChange}
            />
             <TextField
              margin="normal"
              required
              sx={{width: "350px"}}
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
            />

            {alunoOptions.length > 0 ? (
              <Autocomplete
                disablePortal
                options={alunoOptions}
                getOptionLabel={(option) => option ? option.nome : ''}
                isOptionEqualToValue={(option, value) => {
                  if (!value || !option) {
                    return value === option;
                  }
                  return option.id === value.id;
                }}
                value={aluno}
                onChange={(_, newValue) => {
                  setAluno(newValue);
                }}
                renderInput={(params) => <TextField margin="normal" {...params} label="Aluno" />}
              />
            ) : (
              <div>Loading aluno options...</div>
            )}

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
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FormEnvioEstrelas;