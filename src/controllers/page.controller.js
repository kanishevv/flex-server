// Business
import PageBusiness from '@/business/page.business';
import { success, error } from '@/utils/helper.util';
// Libs
// import validator from 'validator';

/**
 * List
 *
 * @param {*} req
 * @param {*} res
 * @returns {any}
 */
const list = async (req, res) => {
  try {
    // Business logic
    const pages = await PageBusiness.list(req.user.id, req.params.projectId);

    // Return success
    success(res, pages);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

/**
 * Create page
 *
 * @param {*} req
 * @param {*} res
 * @returns {object}
 */
const create = async (req, res) => {
  try {
    const body = req.body;

    // Business logic
    const page = await PageBusiness.create(req.params.projectId, body);

    // Return success
    return success(res, { message: 'Page was created', page });
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

/**
 * Update page
 *
 * @param {number} req.params.id
 * @param {object} res
 * @returns {object}
 */
const update = async (req, res) => {
  try {
    const body = req.body;

    // Get current page id from params
    const filter = {
      _id: req.params.id
    };

    // Business logic
    const page = await PageBusiness.update(filter, body);

    if (!page) {
      throw {
        status: false,
        message: 'Page not found'
      };
    } else {
      // Return success
      return success(res, { message: 'Page was updated', page });
    }
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

/**
 * View page
 * @param {*} req
 * @param {*} res
 * @returns {object}
 */
const view = async (req, res) => {
  try {
    // Get current page id from params
    const filter = {
      _id: req.params.id
    };

    // Business logic
    const page = await PageBusiness.view(filter);

    if (!page) {
      throw {
        status: false,
        message: 'Page not found'
      };
    } else {
      // Return success
      return success(res, page);
    }
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

/**
 * Remove page
 * @param {number} req
 * @param {object} res
 * @returns
 */
const remove = async (req, res) => {
  try {
    // Business logic
    const result = await PageBusiness.remove(req.params.id);

    const deleted = result.n ? true : false;

    // Return success
    return success(res, 200, { status: deleted, message: 'Page was deleted' });
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

export default {
  list,
  create,
  view,
  update,
  remove
};
