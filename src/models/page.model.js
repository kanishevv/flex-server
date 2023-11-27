import { Schema, model } from 'mongoose';

// Schema
const schema = new Schema({
  home: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'Page',
    required: true
  },
  type: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  data: [],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

const Model = model('Page', schema);

export default Model;
