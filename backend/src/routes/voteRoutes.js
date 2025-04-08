import express from 'express';
import Vote from '../models/Vote.js';

const router = express.Router();

// 새로운 투표 생성 (어드민)
router.post('/create', async (req, res) => {
  try {
    const { title, maxVoters } = req.body;
    const vote = new Vote({
      title,
      maxVoters
    });
    await vote.save();
    res.status(201).json(vote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 현재 활성화된 투표 조회
router.get('/active', async (req, res) => {
  try {
    const vote = await Vote.findOne({ isActive: true });
    res.json(vote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 투표하기
router.post('/vote/:id', async (req, res) => {
  try {
    const { vote: isYes } = req.body;
    const vote = await Vote.findById(req.params.id);
    
    if (!vote || !vote.isActive) {
      return res.status(400).json({ message: '유효하지 않은 투표입니다.' });
    }

    if (vote.yesCount + vote.noCount >= vote.maxVoters) {
      return res.status(400).json({ message: '최대 투표 인원을 초과했습니다.' });
    }

    if (isYes) {
      vote.yesCount += 1;
    } else {
      vote.noCount += 1;
    }

    if (vote.yesCount + vote.noCount >= vote.maxVoters) {
      vote.isActive = false;
    }

    await vote.save();
    res.json(vote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 투표 결과 조회
router.get('/result/:id', async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id);
    if (!vote) {
      return res.status(404).json({ message: '투표를 찾을 수 없습니다.' });
    }
    res.json(vote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 