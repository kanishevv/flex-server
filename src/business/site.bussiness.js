import SiteModel from '@/models/site.model';
import PageModel from '@/models/page.model';

/**
 * Site list
 *
 * @returns {object}
 */
const list = async (filter, options) => {
  return await SiteModel.paginate(filter, options);
};

/**
 * Site create
 *
 * @param {object} filter
 * @param {object} data
 * @returns {object}
 */
const create = async (data) => {
  const site = new SiteModel(data);

  // Created main page
  const page = await PageModel.create({
    home: true,
    name: 'Homepage',
    site: site.id
  });

  // Added page to site
  site.pages.push(page);

  // Save and return site
  return await site.save();
};

/**
 * Remove site
 * @param {string} id
 * @returns {boolean}
 */
const remove = async (id) => {
  await PageModel.deleteMany({ project: id });

  return SiteModel.deleteOne({ _id: id });
};

export default {
  list,
  create,
  remove
};