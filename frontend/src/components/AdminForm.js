import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const AdminForm = ({ onCreateVote }) => {
  const [title, setTitle] = useState('');
  const [maxVoters, setMaxVoters] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      await onCreateVote({
        title,
        maxVoters: parseInt(maxVoters)
      });
      setTitle('');
      setMaxVoters('');
    } catch (error) {
      console.error('투표 생성 실패:', error);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          새 투표 생성
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
            label="최대 투표 인원"
            type="number"
            value={maxVoters}
            onChange={(e) => setMaxVoters(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading || !title || !maxVoters}
            sx={{ mt: 2 }}
          >
            투표 생성
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminForm; 