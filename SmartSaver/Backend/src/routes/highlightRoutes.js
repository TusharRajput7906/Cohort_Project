import express from 'express';
import {
  createHighlight,
  getHighlightsByContent,
  getAllHighlights,
  updateHighlight,
  deleteHighlight
} from '../controllers/highlightController.js';

const router = express.Router();

router.post('/', createHighlight);
router.get('/', getAllHighlights);
router.get('/content/:contentId', getHighlightsByContent);
router.put('/:id', updateHighlight);
router.delete('/:id', deleteHighlight);

export default router;
