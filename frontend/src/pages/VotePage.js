import React, { useState, useEffect } from 'react';
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
import { v4 as uuidv4 } from 'uuid';

function VotePage() {
  const [voteData, setVoteData] = useState(null);
  const [error, setError] = useState('');
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 브라우저 ID 생성 또는 가져오기
    const browserId = localStorage.getItem('browserId') || uuidv4();
    localStorage.setItem('browserId', browserId);

    // 투표 데이터 로드
    const settings = localStorage.getItem('voteSettings');
    if (settings) {
      setVoteData(JSON.parse(settings));
    }
    
    // 이미 투표했는지 확인
    if (settings) {
      const data = JSON.parse(settings);
      setVoted(data.voters.includes(browserId));
    }
    
    setLoading(false);
  }, []);

  const handleVote = (choice) => {
    const browserId = localStorage.getItem('browserId');
    
    if (!voteData) {
      setError('투표 설정을 찾을 수 없습니다.');
      return;
    }

    if (voteData.currentVotes >= voteData.maxVoters) {
      setError('최대 투표 인원을 초과했습니다.');
      return;
    }

    if (voteData.voters.includes(browserId)) {
      setError('이미 투표하셨습니다.');
      return;
    }

    const updatedVoteData = {
      ...voteData,
      currentVotes: voteData.currentVotes + 1,
      [choice]: voteData[choice] + 1,
      voters: [...voteData.voters, browserId]
    };

    localStorage.setItem('voteSettings', JSON.stringify(updatedVoteData));
    setVoteData(updatedVoteData);
    setVoted(true);
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
          참여 인원: {voteData.currentVotes} / {voteData.maxVoters}
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