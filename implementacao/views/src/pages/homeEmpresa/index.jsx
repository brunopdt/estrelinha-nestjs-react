import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useApi } from "../../api/axiosInstance";
import estrela from "../../assets/Star.png"

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
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 2, border: "3px solid #7F4AA4", padding: "10px 20px 40px 20px", margin: "20px", borderRadius: "10px", textAlign: "center" }}>
          <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "40px", gridColumn: "span 4" }}>
            Vantagens
          </Typography>
          {dadosCarregados ? listaVantagens.data.map((vantagem) => {
            return (
              <Box key={vantagem.nome} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", border: "1px solid #7F4AA4", borderRadius: "10px", textAlign: "left", width: "300px", height: "425px", boxShadow: "rgba(0, 0, 0, 0.15) 5px 5px 2.6px;" }}>
                <img className="card-vantagens" src={vantagem.fotoKey} alt="Card Imagem" />
                <Typography component="h3" variant="h3" sx={{ padding: "20px", color: "#000000", fontSize: "22px" }}>
                  {vantagem.nome}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <Typography component="h3" variant="h3" sx={{ paddingRight: "5px", fontSize: "25px", color: "#FBB80F", fontWeight: "bold" }}>
                    {vantagem.valor}
                  </Typography>
                  <img className="card-estrela" src={estrela} alt="estrela" />
                </Box >

              </Box>
            )
          }) : console.log(listaVantagens)}
          <Button
            component={Link}
            to="/cadastro-vantagem"
            fullWidth
            variant="contained"
            sx={{
              gridColumn: "span 4", margin: "0 auto",
              mt: 1, backgroundColor: "#FBB80F", width:"400px", color: "#7F4AA4", fontWeight: 800, ":hover": {
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