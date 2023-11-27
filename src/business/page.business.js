// Model
import UserModel from '@/models/user.model';
import ProjectModel from '@/models/site.model';
import PageModel from '@/models/page.model';

/**
 * Page list
 *
 * @param {object} filter
 * @returns {object}
 */
const list = async (userId, projectId) => {
  const exists = await UserModel.exists({
    _id: userId,
    projects: projectId
  });

  if (!exists) {
    throw {
      status: false,
      message: 'Project not found'
    };
  } else {
    return await PageModel.find({ project: projectId });
  }
};

/**
 * Page create
 *
 * @param {object} filter
 * @param {object} page
 * @returns {object}
 */
const create = async (projectId, page) => {
  // Database query
  const pageModel = new PageModel({ ...page, project: projectId });

  const project = await ProjectModel.findOne({
    _id: projectId
  });

  // Add page to project
  project.pages.push(pageModel);

  // Update project
  project.save();

  // Save and return page
  return pageModel.save();
};

/**
 * Update page
 *
 * @param {object} filter
 * @param {object} page
 * @returns {object}
 */
const update = async (filter, page) => {
  if (page.home)
    await PageModel.updateMany({ home: true }, { $set: { home: false } });

  // Database query
  return await PageModel.findOneAndUpdate(filter, page, { new: true });
};

/**
 * View page
 *
 * @param {object} filter
 * @returns {object}
 */
const view = async (filter) => {
  // Database query
  return await PageModel.findOne(filter);
};

/**
 * Remove page
 * @param {object} filter
 * @returns {boolean}
 */
const remove = async (id) => {
  return await PageModel.deleteOne({ _id: id });
};

export default {
  list,
  create,
  update,
  view,
  remove
};
