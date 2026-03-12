import express from 'express';
import {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  getKnowledgeGraph,
  getClusters,
  getResurfacedContent,
  semanticSearchContent
} from '../controllers/contentController.js';

const router = express.Router();

router.post('/', createContent);
router.get('/', getAllContent);
router.get('/search/semantic', semanticSearchContent);
router.get('/knowledge-graph', getKnowledgeGraph);
router.get('/clusters', getClusters);
router.get('/resurfaced', getResurfacedContent);
router.get('/:id', getContentById);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);

export default router;
