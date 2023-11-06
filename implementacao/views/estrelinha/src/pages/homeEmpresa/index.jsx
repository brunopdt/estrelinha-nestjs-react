
import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useApi } from "../../api/axiosInstance";

const HomeEmpresa = () => {

  const [listaVantagens, setListaVantagens] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const fetchlistaVantagens = async () => {
    try {
      const data = await useApi.get(`/aluno/vantagens`);
      console.log(data, "Dentro da lista")
      setListaVantagens(data);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchlistaVantagens();
  }, []);

  return (
    <Box component="main" sx={{ display: "flex", flexDirection: "column", flexWrap: "no-wrap", alignItems: "center", backgroundColor: "#FFFFFF", minHeight: "100vh", margin: 0 }}>
      <Box sx={{ height: "50px", width: "100%", backgroundColor: "#FBB80F", margin: 0 }}></Box>
      <Box sx={{ display: "grid", gap: 10, borderRadius: 5, backgroundColor: "#FFFFFF", paddingTop: 7 }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, alignItems: "center", border: "3px solid #7F4AA4", padding: "10px 20px 40px 20px", borderRadius: "10px", textAlign: "center" }}>
          <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "40px", gridColumn: "span 3" }}>
            Vantagens
          </Typography>
          {dadosCarregados ? listaVantagens.data.map((vantagem) => {
            return (
              <Box key={vantagem.nome} sx={{ border: "3px solid #7F4AA4", padding: "10px 10px", borderRadius: "10px", textAlign: "center" }}>
                <img className="estrela-lista" src={vantagem.fotoKey} alt="" />
                <Typography component="h3" variant="h3" sx={{ paddingTop: "3px", color: "#000000", fontSize: "20px" }}>
                  <b>Nome:</b> {vantagem.nome}
                </Typography>
                <Typography component="h3" variant="h3" sx={{ paddingTop: "3px", color: "#000000", fontSize: "25px" }}>
                  <b>Valor:</b>{vantagem.valor}
                </Typography>

              </Box>
            )
          }) : console.log(listaVantagens)}
          <Button
          component={Link}
          to="/cadastro-vantagem"
            fullWidth
            variant="contained"
            sx={{
              gridColumn: "span 3",
              mt: 1, backgroundColor: "#FBB80F", color: "#7F4AA4", fontWeight: 800, ":hover": {
                backgroundColor: '#7F4AA4', color: '#FBB80F'
              }
            }}
          >
            Cadastrar Nova Vantagem
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default HomeEmpresa;