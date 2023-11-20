
import { Button, Box, TextField, Grid, Typography, Container } from "@mui/material";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css"

import { useApi } from "../../api/axiosInstance";
import Swal from "sweetalert2";

const CadastroVantagem = () => {
  const [formData, setFormData] = useState({
    nome: "",
    valor: 0
  });

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [base64Image, setBase64Image] = useState("");


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const cnpj = JSON.parse(localStorage.getItem("usuario")).data.cnpj
        console.log({
          nome: formData.nome,
          valor: parseInt(formData.valor),
          fotoKey: base64Image,
          empresaCnpj: cnpj
        })
        await useApi.post("/empresa/transacao", {
          nome: formData.nome,
          valor: parseInt(formData.valor),
          fotoKey: base64Image,
          empresaCnpj: cnpj
        });

        navigate("/home-empresa")
        
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Dados inválidos',
        })
      }
    },
    [base64Image, formData]
  );

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  const handleImageUpload = (event) => {
    const files = event.target.files;

    if (files) {
      console.log(files)
      const fileArray = Array.from(files);

      // Update your state to include all the selected files
      setImages([...images, ...fileArray]);

      // Process each file individually
      fileArray.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            const base64String = btoa(e.target.result);
            setBase64Image(base64String);
            console.log("Base64 image for a file:", base64String);
          }
        };

        reader.readAsBinaryString(file);
      });
    }
  };


  return (
    <Container component="main" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Box sx={{ display: "flex", gap: 10, borderRadius: 5, backgroundColor: "#FFFFFF", paddingLeft: 7 }}
      >
        <Box sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 350
        }}>
          <Typography component="h1" variant="h2" sx={{ color: "#FBB80F", fontFamily: "Shantell Sans", fontSize: 30, marginBottom: "30px" }}>
            Cadastro Vantagem
          </Typography>

          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', marginLeft: -3.7 }}>
            <Grid item xs={12} md={10} lg={10} >
              <div className="drop-container">
                <span className="drop-title">Anexe a foto</span>
                <input type="file" id="file-input" accept="image/*"
                  onChange={handleImageUpload} />
              </div>
            </Grid>
            <Grid item xs={12} md={10} lg={10} sx={{alignItems: "center", justifyContent: "center"}}>
              {imageURLs.map((imageSrc) => <img className="image-upload" key={imageSrc} src={imageSrc} />
              )}
            </Grid>
          </Grid>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nome da Vantagem"
              name="nome"
              value={formData.nome}
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="valor"
              label="Valor"
              value={formData.valor}
              onChange={handleChange}

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, backgroundColor: "#FBB80F", color: "#7F4AA4", fontWeight: 800, marginBottom: 10,
                ":hover": {
                  backgroundColor: '#7F4AA4', color: '#FBB80F'
                }
              }}
            >
              CADASTRAR
            </Button>
          </Box>
        </Box>
        <Box className="imagem-vantagem">

        </Box>
      </Box>
    </Container>
  );
};

export default CadastroVantagem;