import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

const VoteForm = ({ vote, onVote, hasVoted }) => {
  const [loading, setLoading] = useState(false);

  const handleVote = async (isYes) => {
    if (loading || hasVoted) return;
    setLoading(true);
    await onVote(isYes);
    setLoading(false);
  };

  if (!vote) {
    return (
      <Card>
        <CardContent>
          <Typography>현재 진행중인 투표가 없습니다.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {vote.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          참여 인원: {vote.yesCount + vote.noCount} / {vote.maxVoters}
        </Typography>
        {hasVoted ? (
          <Box>
            <Typography>투표 결과:</Typography>
            <Typography>찬성: {vote.yesCount}명</Typography>
            <Typography>반대: {vote.noCount}명</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleVote(true)}
              disabled={loading || hasVoted}
            >
              찬성
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleVote(false)}
              disabled={loading || hasVoted}
            >
              반대
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VoteForm; 