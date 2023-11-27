import { Schema, model } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

// Schema
const schema = new Schema({
  name: {
    type: String,
    default: 'Untitled'
  },
  active: {
    type: Boolean,
    default: true
  },
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Page'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  viewed: {
    type: Date,
    default: Date.now
  }
});

// Plugins
schema.plugin(mongoosePaginate);

const Model = model('Site', schema);

Model.paginate.options = {
  limit: 10,
  customLabels: {
    docs: 'items',
    totalDocs: 'totalItems'
  }
};

export default Model;
