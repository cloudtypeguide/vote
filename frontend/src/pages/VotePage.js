import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import VoteForm from '../components/VoteForm';
import axios from 'axios';

const VotePage = () => {
  const [vote, setVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchActiveVote = async () => {
      try {
        const response = await axios.get('/api/votes/active');
        setVote(response.data);
        const voted = localStorage.getItem(`voted_${response.data?._id}`);
        setHasVoted(!!voted);
      } catch (error) {
        console.error('투표 조회 실패:', error);
      }
    };

    fetchActiveVote();
  }, []);

  const handleVote = async (isYes) => {
    try {
      const response = await axios.post(`/api/votes/vote/${vote._id}`, {
        vote: isYes
      });
      setVote(response.data);
      setHasVoted(true);
      localStorage.setItem(`voted_${vote._id}`, 'true');
    } catch (error) {
      console.error('투표 실패:', error);
      alert('투표에 실패했습니다.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <VoteForm
          vote={vote}
          onVote={handleVote}
          hasVoted={hasVoted}
        />
      </Box>
    </Container>
  );
};

export default VotePage; 