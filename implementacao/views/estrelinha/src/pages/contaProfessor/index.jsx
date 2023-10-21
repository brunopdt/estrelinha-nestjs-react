import { Box, Typography, Button, Dialog } from "@mui/material";
import {  useState } from "react";

import imagemSaldo from "../../assets/saldo-imagem.png"
import estrela from "../../assets/Star.png"

import "./style.css"
import ListaTransacoes from "../../components/listaTransacoes";
import FormEnvioEstrelas from "../../components/formEnvioEstrelas";


const ContaProfessor = () => {
  const [openDialog, setOpendialog] = useState(false)

  return (
    <Box component="main" sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FFFFFF", height: "100vh", margin: 0 }}>
      <Box sx={{ height: "50px", width: "100%", backgroundColor: "#FBB80F", margin: 0 }}></Box>
      <Box sx={{ display: "flex", gap: 5, borderRadius: 5, paddingLeft: 7 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <img className="imagem-saldo" src={imagemSaldo} alt="Imagem de uma estrela" />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <Typography component="h2" variant="h3" sx={{ color: "#7F4AA4", fontWeight: 600, fontSize: "40px" }}>
              Seu Saldo
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <img src={estrela} className="estrela" />
              <Typography component="h2" variant="h3" sx={{ paddingTop: "7px", color: "#000000", fontWeight: 600, fontSize: "40px" }}>
                150
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

              <Dialog  open={openDialog} onClose={() => setOpendialog(false)}>
              <Box sx={{ margin: "50px 10px" }}>
                <FormEnvioEstrelas/>
              </Box>
            </Dialog>
      </Box>

    </Box>
      </Box >
  <ListaTransacoes />
    </Box >
  );
};

export default ContaProfessor;