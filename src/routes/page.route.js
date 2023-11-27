import express from 'express';
// Controllers
import PageController from '@/controllers/page.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

/**
 * GET /api/projects/:projectId/pages
 * @summary Get all pages
 * @tags Pages
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.get(
  '/api/projects/:projectId/pages',
  mw(['projects_list']),
  PageController.list
);

/**
 * POST /api/projects/:projectId/pages
 * @summary Create page
 * @tags Pages
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.post(
  '/api/projects/:projectId/pages',
  mw(['projects_list']),
  PageController.create
);

/**
 * PUT /api/pages/:id
 * @summary Update page
 * @tags Pages
 * @param {id'} '/api/pages
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.put('/api/pages/:id', mw(['projects_list']), PageController.update);

/**
 * GET /api/pages/:id
 * @summary View project
 * @tags Pages
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.get('/api/pages/:id', mw(['projects_list']), PageController.view);

/**
 * DELETE /api/pages/:id
 * @summary Page remove
 * @tags Pages
 * @param {id'} '/api/pages
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.delete('/api/pages/:id', mw(['projects_list']), PageController.remove);

export default router;
