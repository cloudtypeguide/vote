import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import VotePage from './pages/VotePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            학교 투표 시스템
          </Typography>
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