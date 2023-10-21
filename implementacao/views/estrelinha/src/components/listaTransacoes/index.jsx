import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useApi } from "../../api/axiosInstance";

import estrela from "../../assets/Star.png"

const ListaTransacoes = () => {

  const [listaTransacoes, setlistaTransacoes] = useState([]);

  const fetchlistaTransacoes = async () => {
    try {
      const response = await fetch('URL_DA_SUA_API_AQUI');
      if (response.ok) {
        const nomeUsuario = JSON.parse(localStorage.getItem("usuario")).data.nomeUsuario
        const data = await useApi.get(`/professor/transacoes/${nomeUsuario}`);
        console.log(data)
        setlistaTransacoes(data);
      } else {
        console.error('Erro na requisição:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchlistaTransacoes();
  }, []);

  return (
    <Box sx={{ border: "3px solid #7F4AA4", padding: "10px", borderRadius: "10px", textAlign: "center" }}>
      <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#7F4AA4", fontWeight: 600, fontSize: "40px" }}>
        Transações
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <img className="estrela-lista" src={estrela} alt="" />
        <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontSize: "30px" }}>
          Ana Clara Lima recebeu 100 estrelas
        </Typography>
        {listaTransacoes.map((item) => {
          return (
            <Box key={item.nomeUsuario} sx={{ display: "flex", gap: 2 }}>
              <img className="estrela-lista" src={estrela} alt="" />
              <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontSize: "30px" }}>
                Ana Clara Lima recebeu 100 estrelas
              </Typography>
              </Box>
              )
          })}
            </Box>
      </Box>
      );
};

      export default ListaTransacoes;