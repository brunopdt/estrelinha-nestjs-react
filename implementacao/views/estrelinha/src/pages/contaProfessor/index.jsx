import { Box, Typography, Button, Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import { useApi } from "../../api/axiosInstance";

import imagemSaldo from "../../assets/saldo-imagem.png"
import estrela from "../../assets/Star.png"

import "./style.css"
import FormEnvioEstrelas from "../../components/formEnvioEstrelas";


const ContaProfessor = () => {
  const [openDialog, setOpendialog] = useState(false)

  const [listaTransacoes, setlistaTransacoes] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const fetchlistaTransacoes = async () => {
    try {
      const nomeUsuario = JSON.parse(localStorage.getItem("usuario")).data.nomeUsuario
      const data = await useApi.get(`/professor/transacoes/${nomeUsuario}`);
      console.log(data, "Dentro da lista")
      setlistaTransacoes(data);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchlistaTransacoes();
  }, [openDialog]);

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
              }} onClick={() => setOpendialog(true)}>Dar Estrelas</Button>

            <Dialog open={openDialog} onClose={() => setOpendialog(false)}>
              <Box sx={{ margin: "50px 10px" }}>
                <FormEnvioEstrelas setOpendialog={setOpendialog} fetchlistaTransacoes={fetchlistaTransacoes} />
              </Box>
            </Dialog>
          </Box>

        </Box>
      </Box >
      <Box sx={{ border: "3px solid #7F4AA4", padding: "10px 40px", borderRadius: "10px", textAlign: "center", marginBottom: "50px" }}>
        <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "40px" }}>
          Transações
        </Typography>
        {dadosCarregados ? listaTransacoes.data.premiacoes.map((premiacao) => {
          return (
            <Box key={premiacao.nomeUsuario} sx={{ display: "flex", gap: 2 }}>
              <img className="estrela-lista" src={estrela} alt="" />
              <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontSize: "30px" }}>
                Ana Clara Lima recebeu {premiacao.valor} estrelas
              </Typography>
            </Box>
          )
        }) : console.log(listaTransacoes)}

      </Box>
    </Box >
  );
};

export default ContaProfessor;