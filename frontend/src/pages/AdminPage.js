import React from 'react';
import { Container, Box } from '@mui/material';
import AdminForm from '../components/AdminForm';
import axios from 'axios';

const AdminPage = () => {
  const handleCreateVote = async (voteData) => {
    try {
      await axios.post('/api/votes/create', voteData);
      alert('투표가 생성되었습니다.');
    } catch (error) {
      console.error('투표 생성 실패:', error);
      alert('투표 생성에 실패했습니다.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <AdminForm onCreateVote={handleCreateVote} />
      </Box>
    </Container>
  );
};

export default AdminPage; 