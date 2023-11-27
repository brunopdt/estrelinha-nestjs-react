import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import estrela from "../../assets/Star.png"

import { useApi } from "../../api/axiosInstance";

const LojaAluno = () => {

  const [listaVantagens, setListaVantagens] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const navigate = useNavigate();


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

  const efetuarCompra = async (idVantagem) => {
    try {
      const nomeUsuario = JSON.parse(localStorage.getItem("usuario")).data.nomeUsuario
      await useApi.post(`/aluno/comprar-vantagem/${nomeUsuario}`, {
        vantagemId: idVantagem
      });
      Swal.fire({
        icon: 'success',
        position: 'top-end',
        title: 'Sucesso',
        showConfirmButton: false,
        timer: 1000
      })
      navigate('/conta-aluno')
    } catch (error) {
      console.error('Erro na compra:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuário inválido',
      })
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
        
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 2, alignItems: "center", border: "3px solid #7F4AA4", padding: "10px 20px 0px 20px", borderRadius: "10px", textAlign: "center" }}>

          <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "40px", gridColumn: "span 4" }}>
            Vantagens
          </Typography>
          {dadosCarregados ? listaVantagens.data.map((vantagem) => {
            return (
              <Box key={vantagem.nome} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", border: "1px solid #7F4AA4", borderRadius: "10px", textAlign: "left", width: "300px", height: "480px", boxShadow: "rgba(0, 0, 0, 0.15) 5px 5px 2.6px;" }}>
                <img className="card-vantagens" src={vantagem.fotoKey} alt="Card Imagem" />
                <Typography component="h3" variant="h3" sx={{ padding: "20px", color: "#000000", fontSize: "22px" }}>
                  {vantagem.nome}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography component="h3" variant="h3" sx={{ paddingRight: "5px", fontSize: "25px", color: "#FBB80F", fontWeight: "bold" }}>
                    {vantagem.valor}
                  </Typography>
                  <img className="card-estrela" src={estrela} alt="estrela" />
                </Box >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => efetuarCompra(vantagem.id)}
                  sx={{
                    width: "200px", marginBottom: "10px",
                    backgroundColor: "#FBB80F", color: "#7F4AA4", fontWeight: 800, ":hover": {
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