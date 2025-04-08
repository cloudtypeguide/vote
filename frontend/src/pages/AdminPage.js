import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
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
    // 현재 진행 중인 투표가 있는지 확인
    const fetchCurrentVote = async () => {
      try {
        const response = await axios.get('/api/votes/active');
        if (response.data) {
          setTitle(response.data.title);
          setMaxVoters(response.data.maxVoters);
        }
      } catch (error) {
        console.error('투표 조회 실패:', error);
      }
    };

    fetchCurrentVote();
  }, []);

  const handleSubmit = async (e) => {
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

    try {
      // 투표 생성 API 호출
      await axios.post('/api/votes/create', {
        title,
        maxVoters: votersNum
      });
      
      setSuccess(true);
      
      // 3초 후 메인 페이지로 이동
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('투표 생성 실패:', error);
      setError('투표 생성에 실패했습니다. 다시 시도해주세요.');
    }
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