// Business
import SiteBusiness from '@/business/site.bussiness';
import { success, error } from '@/utils/helper.util';

/**
 * List
 *
 * @param {number} req.params.id
 * @param {*} req
 * @param {*} res
 * @returns {any}
 */
const list = async (req, res) => {
  try {
    let filter = {};

    // Business logic
    const channels = await SiteBusiness.list(filter);

    // Return success
    success(res, 200, channels);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

/**
 * Create channel
 *
 * @param {*} req
 * @param {*} res
 * @returns {object}
 */
const create = async (req, res) => {
  try {
    const body = req.body;

    // Business logic
    const channel = await SiteBusiness.create(body);

    // Return success
    return success(res, 201, {
      status: true,
      message: 'Channel was created',
      channel
    });
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

/**
 * Remove site
 * @param {number} req
 * @param {object} res
 * @returns
 */
const remove = async (req, res) => {
  try {
    // Business logic
    const result = await SiteBusiness.remove(req.params.id);

    const deleted = result.n ? true : false;

    // Return success
    return success(res, 200, {
      status: deleted,
      message: 'Channel was deleted'
    });
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

export default {
  list,
  create,
  remove
};
