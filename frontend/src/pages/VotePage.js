import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';

function VotePage() {
  const [voteData, setVoteData] = useState(null);
  const [error, setError] = useState('');
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const response = await axios.get('/api/votes/active');
        setVoteData(response.data);
        if (response.data) {
          // 이미 투표했는지 확인
          const hasVoted = await axios.get(`/api/votes/${response.data._id}/check`);
          setVoted(hasVoted.data.hasVoted);
        }
      } catch (error) {
        console.error('투표 데이터 조회 실패:', error);
        setError('투표 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchVoteData();
  }, []);

  const handleVote = async (choice) => {
    try {
      if (!voteData) {
        setError('투표 데이터를 찾을 수 없습니다.');
        return;
      }

      const response = await axios.post(`/api/votes/${voteData._id}/vote`, {
        choice
      });

      setVoteData(response.data);
      setVoted(true);
    } catch (error) {
      console.error('투표 실패:', error);
      if (error.response?.status === 400) {
        setError(error.response.data.message || '투표할 수 없습니다.');
      } else {
        setError('투표에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!voteData) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="info">현재 진행 중인 투표가 없습니다.</Alert>
      </Container>
    );
  }

  const totalVotes = voteData.agree + voteData.disagree;
  const agreePercentage = totalVotes === 0 ? 0 : Math.round((voteData.agree / totalVotes) * 100);
  const disagreePercentage = totalVotes === 0 ? 0 : Math.round((voteData.disagree / totalVotes) * 100);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          {voteData.title}
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
          참여 인원: {totalVotes} / {voteData.maxVoters}
        </Typography>

        {error && (
          <Box mt={2} mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {!voted ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleVote('agree')}
              >
                찬성
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                size="large"
                onClick={() => handleVote('disagree')}
              >
                반대
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom align="center">
              투표 결과
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                찬성: {voteData.agree}명 ({agreePercentage}%)
              </Typography>
              <Typography variant="body1">
                반대: {voteData.disagree}명 ({disagreePercentage}%)
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default VotePage; 