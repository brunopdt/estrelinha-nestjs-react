import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import estrela from "../../assets/Star.png"
import { useApi } from "../../api/axiosInstance";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const CardProduto = ({ temBotao, vantagem }) => {

  const navigate = useNavigate();

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Erro na compra: ${error}`,
      })
    }
  };

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
        {temBotao ? <Button
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
        </Button> : ""}

      </Box>
  );
};

CardProduto.PropTypes = {
  vantagem: PropTypes.object,
  temBotao: PropTypes.bool
}

export default CardProduto;