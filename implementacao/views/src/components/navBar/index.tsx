import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the ExitToAppIcon from @mui/icons-material

export const Navegacao = () => {
  const navigate = useNavigate();

  const handleContaAluno = () => {
    navigate('/conta-aluno');
  }

  const handleHomeEmpresa = () => {
    navigate('/home-empresa');
  } 

  const handleCadastroVantagem = () => {
    navigate('/cadastro-vantagem');
  }
 
  const handleSair = () => {
    navigate('/');
  }

  const handleContaProfessor = () => {
    navigate('/conta-professor')
  }

  const handleLojaAluno = () => {
    navigate('/loja-aluno')
  }

  return (
    <AppBar sx={{ position: 'sticky'}} style={{ background: '#FBB80F' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1}} />
          <Button color="inherit" onClick={handleHomeEmpresa} >Home</Button>
          <Button color="inherit" onClick={handleContaProfessor} >Conta professor</Button>
          <Button color="inherit" onClick={handleContaAluno} >COnta Aluno</Button>
          <Button color="inherit" onClick={handleCadastroVantagem} >Cadastro Vantagens</Button>
          <Button color="inherit" onClick={handleLojaAluno} >Loja</Button>          
        <IconButton size="large" edge="end" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleSair}>
          <ExitToAppIcon fontSize="medium" />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}