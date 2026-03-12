import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Content API
export const contentAPI = {
  getAll: (params) => api.get('/content', { params }),
  getById: (id) => api.get(`/content/${id}`),
  create: (data) => api.post('/content', data),
  update: (id, data) => api.put(`/content/${id}`, data),
  delete: (id) => api.delete(`/content/${id}`),
  getKnowledgeGraph: () => api.get('/content/knowledge-graph'),
  getClusters: () => api.get('/content/clusters'),
  getResurfaced: () => api.get('/content/resurfaced'),
  semanticSearch: (query) => api.get('/content/search/semantic', { params: { query } }),
};

// Collection API
export const collectionAPI = {
  getAll: () => api.get('/collections'),
  getById: (id) => api.get(`/collections/${id}`),
  create: (data) => api.post('/collections', data),
  update: (id, data) => api.put(`/collections/${id}`, data),
  delete: (id) => api.delete(`/collections/${id}`),
  addContent: (id, contentId) => api.post(`/collections/${id}/add`, { contentId }),
  removeContent: (id, contentId) => api.delete(`/collections/${id}/content/${contentId}`),
};

// Highlight API
export const highlightAPI = {
  getAll: () => api.get('/highlights'),
  getByContent: (contentId) => api.get(`/highlights/content/${contentId}`),
  create: (data) => api.post('/highlights', data),
  update: (id, data) => api.put(`/highlights/${id}`, data),
  delete: (id) => api.delete(`/highlights/${id}`),
};

export default api;
