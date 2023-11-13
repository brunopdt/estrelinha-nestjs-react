import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useApi } from "../../api/axiosInstance";

import imagemSaldo from "../../assets/saldo-imagem.png"
import estrela from "../../assets/Star.png"

import "../contaProfessor/style.css"
import { useNavigate } from "react-router-dom";

const ContaAluno = () => {
  const navigate = useNavigate();

  const [listaPremiacoes, setListaPremiacoes] = useState([]);
  const [listaTransacoes, setListaTransacoes] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const fetchlistaPremiacoes = async () => {
    try {
      const nomeUsuario = JSON.parse(localStorage.getItem("usuario")).data.nomeUsuario
      const data = await useApi.get(`/aluno/premiacoes/${nomeUsuario}`);
      setListaPremiacoes(data);
      fetchlistaTransacoes();
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const fetchlistaTransacoes = async () => {
    try {
      const nomeUsuario = JSON.parse(localStorage.getItem("usuario")).data.nomeUsuario
      const data = await useApi.get(`/aluno/transacoes/${nomeUsuario}`);
      setListaTransacoes(data);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };


  useEffect(() => {
    fetchlistaPremiacoes();
  }, []);


  return (
    <Box component="main" sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FFFFFF", minHeight: "100vh", margin: 0 }}>
      <Box sx={{ height: "50px", width: "100%", backgroundColor: "#FBB80F", margin: 0 }}></Box>
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
                {dadosCarregados ? listaPremiacoes.data.saldo : ""}
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
              }} onClick={() => navigate("/loja-aluno")}>Ver loja</Button>

          </Box>

        </Box>
      </Box >
      <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2}}>
        <Box sx={{ border: "3px solid #7F4AA4", padding: "10px 40px", borderRadius: "10px", textAlign: "center", marginBottom: "50px", marginLeft: 1 }}>
          <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "35px" }}>
            Estrelas Recebidas
          </Typography>
          {dadosCarregados ? listaPremiacoes.data.premiacoes.map((premiacao) => {
            return (
              <Box key={premiacao.id} sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                <img className="estrela-lista" src={estrela} alt="" />
                <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontSize: "25px" }}>
                  Você recebeu {premiacao.valor} estrelas do {premiacao.professor.nome}
                </Typography>
              </Box>
            )
          }) : console.log(listaPremiacoes)}

        </Box>
        <Box sx={{ border: "3px solid #7F4AA4", padding: "10px 40px", borderRadius: "10px", textAlign: "center", marginBottom: "50px", marginRight: 1 }}>
          <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "35px"}}>
            Compras Realizadas
          </Typography>
          {dadosCarregados && (listaTransacoes.data) ? listaTransacoes.data.map((transacao) => {
            return (
              <Box key={transacao.id} sx={{ display: "flex", gap: 0.5, marginTop: 1 }}>
                <img className="estrela-lista" src={estrela} alt="" />
                <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontSize: "25px" }}>
                {transacao.valor} - {transacao.vantagem.nome}
                </Typography>
              </Box>
            )
          }) : console.log(listaTransacoes)}

        </Box>
      </Box>
    </Box >
  );
};

export default ContaAluno;