import { Box, Typography, Button, Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import { useApi } from "../../api/axiosInstance";
import { Navegacao } from "../../components/navBar";
import imagemSaldo from "../../assets/saldo-imagem.png"
import estrela from "../../assets/Star.png"

import "./style.css"
import FormEnvioEstrelas from "../../components/formEnvioEstrelas";


const ContaProfessor = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const [abrirDescricao, setAbrirDescricao] = useState(false)
  const [currentItem, setCurrentItem] = useState(null);

  const [listaTransacoes, setListaTransacoes] = useState([]);
  const [listaAlunos, setListaAlunos] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [dadosCarregadosAlunos, setDadosCarregadosAlunos] = useState(false);

  const fetchlistaTransacoes = async () => {
    try {
      const nomeUsuario = JSON.parse(localStorage.getItem("usuario")).data.nomeUsuario
      const data = await useApi.get(`/professor/transacoes/${nomeUsuario}`);
      setListaTransacoes(data);
      fetchlistaAlunos()
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const abrirDescricaoIndividual = (item) => {
    setCurrentItem(item)
    setAbrirDescricao(true)
  }

  const fetchlistaAlunos = async () => {
    try {
      const data = await useApi.get(`/aluno`);
      console.log(data)
      setListaAlunos(data);
      setDadosCarregadosAlunos(true);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };
  useEffect(() => {
    fetchlistaTransacoes();
  }, [openDialog]);

  return (
    <>
      <Navegacao />
      <Box component="main" sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FFFFFF", minHeight: "100vh", margin: 0 }}>
        <Box sx={{ display: "flex", gap: 5, borderRadius: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <img className="imagem-saldo" src={imagemSaldo} alt="Imagem de uma estrela" />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <Typography component="h2" variant="h3" sx={{ color: "#7F4AA4", fontWeight: 600, fontSize: "40px" }}>
                Seu Saldo
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <img src={estrela} className="estrela" />
                <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontWeight: 600, fontSize: "40px" }}>
                  {dadosCarregados ? listaTransacoes.data.saldo : ""}
                </Typography>
              </Box>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1, mb: 2, backgroundColor: '#7F4AA4', color: '#FBB80F', fontWeight: 800,
                  ":hover": {
                    backgroundColor: "#FBB80F", color: "#7F4AA4"
                  }
                }} onClick={() => setOpenDialog(true)}>Dar Estrelas</Button>

              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <Box sx={{ margin: "50px 10px" }}>
                  <FormEnvioEstrelas setOpendialog={setOpenDialog} />
                </Box>
              </Dialog>
            </Box>

          </Box>
        </Box >
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Box sx={{ border: "3px solid #7F4AA4", padding: "10px 40px", borderRadius: "10px", textAlign: "center", marginBottom: "50px" }}>
            <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "35px" }}>
              Transações
            </Typography>
            {dadosCarregados ? listaTransacoes.data.premiacoes.map((premiacao) => {
              return (
                <Box key={premiacao.id} onClick={() => abrirDescricaoIndividual(premiacao)} sx={{ display: "flex", gap: 2, marginTop: 1, ":hover": {
                  cursor: "pointer"
                } }} className="list-item">
                  <img className="estrela-lista" src={estrela} alt="" />
                  <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontSize: "25px" }}>
                    Você enviou {premiacao.valor} estrelas para {premiacao.aluno.nome}!
                  </Typography>
                </Box>

              )
            }) : console.log(listaTransacoes)}


            <Dialog open={abrirDescricao} onClose={() => setAbrirDescricao(false)} onClick={() => setAbrirDescricao(false)}>
              {currentItem ?
                <Box sx={{ margin: "60px 10px" }}>

                  <Typography sx={{ fontSize: 25 }}>Você enviou {currentItem.valor} estrelas para {currentItem.aluno.nome}</Typography>
                  <Typography sx={{ fontSize: 25 }}>Motivo: {currentItem.descricao}</Typography>

                </Box> : ""
              }
            </Dialog>
          </Box>
          <Box sx={{ border: "3px solid #7F4AA4", padding: "10px 40px", borderRadius: "10px", textAlign: "center", marginBottom: "50px" }}>
            <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "35px" }}>
              Top Alunos
            </Typography>
            {dadosCarregadosAlunos ? listaAlunos.data.map((aluno) => {
              return (
                <Box key={aluno.cpf} sx={{ display: "flex", gap: 2, marginTop: 1 }} className="list-item">
                  <img className="estrela-lista" src={estrela} alt="" />
                  <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontSize: "25px" }}>
                    {aluno.nome}
                  </Typography>
                </Box>
              )
            }) : console.log(listaTransacoes)}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContaProfessor;