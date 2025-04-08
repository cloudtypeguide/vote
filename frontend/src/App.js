import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import VotePage from './pages/VotePage';
import AdminPage from './pages/AdminPage';

function AdminButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPassword('');
    setError(false);
  };

  const handleSubmit = () => {
    if (password === '1234') {
      handleClose();
      navigate('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Button color="inherit" onClick={handleOpen}>
        관리자 페이지
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>관리자 인증</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="비밀번호"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            helperText={error ? "비밀번호가 올바르지 않습니다" : ""}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            학교 투표 시스템
          </Typography>
          <AdminButton />
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<VotePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App; 