
import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "../../api/axiosInstance";
import Swal from "sweetalert2";

const LojaAluno = () => {

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
        <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, alignItems: "center", border: "3px solid #7F4AA4", padding: "10px 20px 40px 20px", borderRadius: "10px", textAlign: "center" }}>
          <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "40px", gridColumn: "span 3" }}>
            Vantagens
          </Typography>
          {dadosCarregados ? listaVantagens.data.map((vantagem) => {
            return (
              <Box key={vantagem.nome} sx={{ border: "3px solid #7F4AA4", padding: "10px 40px", borderRadius: "10px", textAlign: "center" }}>
                <img className="estrela-lista" src="" alt="" />
                <Typography component="h3" variant="h3" sx={{ paddingTop: "3px", color: "#000000", fontSize: "25px" }}>
                  <b>Valor:</b>{vantagem.valor}
                </Typography>
                <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 1, mb: 1, backgroundColor: "#FBB80F", color: "#7F4AA4", fontWeight: 800, ":hover": {
                  backgroundColor: '#7F4AA4', color: '#FBB80F'
                }
              }}
            >
              Comprar
            </Button>
              </Box>
            )
          }) : console.log(listaVantagens)}

        </Box>
      </Box>
    </Box>
  );
};

export default LojaAluno;