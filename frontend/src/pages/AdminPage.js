import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [maxVoters, setMaxVoters] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // 저장된 투표 설정 불러오기
    const savedSettings = localStorage.getItem('voteSettings');
    if (savedSettings) {
      const { title: savedTitle, maxVoters: savedMaxVoters } = JSON.parse(savedSettings);
      setTitle(savedTitle);
      setMaxVoters(savedMaxVoters);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // 입력값 검증
    if (!title.trim()) {
      setError('투표 주제를 입력해주세요.');
      return;
    }
    
    const votersNum = parseInt(maxVoters);
    if (isNaN(votersNum) || votersNum < 1) {
      setError('유효한 투표 인원수를 입력해주세요.');
      return;
    }

    // 투표 설정 저장
    const settings = {
      title,
      maxVoters: votersNum,
      currentVotes: 0,
      agree: 0,
      disagree: 0,
      voters: [] // 투표한 사용자들의 브라우저 ID를 저장할 배열
    };
    
    localStorage.setItem('voteSettings', JSON.stringify(settings));
    setSuccess(true);
    
    // 3초 후 메인 페이지로 이동
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          투표 설정
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="투표 주제"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="최대 투표 인원수"
            type="number"
            value={maxVoters}
            onChange={(e) => setMaxVoters(e.target.value)}
            margin="normal"
            required
            inputProps={{ min: 1 }}
          />
          
          {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          
          {success && (
            <Box mt={2}>
              <Alert severity="success">
                설정이 저장되었습니다. 메인 페이지로 이동합니다.
              </Alert>
            </Box>
          )}
          
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              설정 저장
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default AdminPage; 