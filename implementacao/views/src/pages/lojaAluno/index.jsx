import { Box, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import CardProduto from "../../components/CardProduto";
import { useApi } from "../../api/axiosInstance";

const LojaAluno = () => {

  const [listaVantagens, setListaVantagens] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const fetchlistaVantagens = async () => {
    try {
      const data = await useApi.get(`/aluno/vantagens`);
      console.log(data)
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 10, borderRadius: 5, backgroundColor: "#FFFFFF", paddingTop: 7 }}
      >
        
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1.5, alignItems: "center", border: "3px solid #7F4AA4", padding: "10px 20px 20px 20px", borderRadius: "10px", textAlign: "center" }}>

          <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "40px", gridColumn: "span 4" }}>
            Vantagens
          </Typography>
          {dadosCarregados ? listaVantagens.data.map((vantagem) => {
            return (
              <CardProduto key={vantagem.nome} vantagem={vantagem} temBotao={true} />
            )
          }) : console.log(listaVantagens)}

        </Box>
      </Box>
    </Box>
  );
};

export default LojaAluno;