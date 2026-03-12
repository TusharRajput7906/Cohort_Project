import express from 'express';
import {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  addToCollection,
  removeFromCollection
} from '../controllers/collectionController.js';

const router = express.Router();

router.post('/', createCollection);
router.get('/', getAllCollections);
router.get('/:id', getCollectionById);
router.put('/:id', updateCollection);
router.delete('/:id', deleteCollection);
router.post('/:id/add', addToCollection);
router.delete('/:id/content/:contentId', removeFromCollection);

export default router;
