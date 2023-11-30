import express from 'express';
// Controllers
import ChannelController from '@/controllers/channel.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

/**
 * GET /api/channels
 * @summary Get all channels
 * @tags Pages
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.get('/api/channels', /*mw(['channels_list']),*/ ChannelController.list);


/**
 * POST /api/channels
 * @summary Create channel
 * @tags channels
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.post('/api/channels', mw(['channels_create']), ChannelController.create);

/**
 * GET /api/channels/:id
 * @summary Channel view
 * @tags Channels
 * @param {id'} '/api/channels
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.get('/api/channels/:id', ChannelController.view);

/**
 * DELETE /api/channels/:id
 * @summary Channel remove
 * @tags Channels
 * @param {id'} '/api/channels
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.delete('/api/channels/:id', /*mw(['channels_delete']),*/ ChannelController.remove);

export default router;
