import { Box, Typography } from "@mui/material";
import estrela from "../../assets/Star.png"
import { useState, useEffect } from "react"

const ListaTransacoes = (listaTransacoes) => {
  const [dados, setDadosCarregados] = useState(false);

  useEffect(() => {
    if (listaTransacoes.dados) {
      setDadosCarregados(true);
    }
  }, [listaTransacoes]);


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
      </Box>
      {dados ? listaTransacoes.listaTransacoes.data.premiacoes.map((item) => {
        return (
          <Box key={item.nomeUsuario} sx={{ display: "flex", gap: 2 }}>
            <img className="estrela-lista" src={estrela} alt="" />
            <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontSize: "30px" }}>
              Ana Clara Lima recebeu 100 estrelas
            </Typography>
          </Box>
        )
      }) : console.log(listaTransacoes)}

    </Box>
  );
};

export default ListaTransacoes;