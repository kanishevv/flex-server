import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import bcrypt from 'bcrypt';

// Schema
const schema = new Schema({
  email: {
    type: String,
    trim: true,
    index: { unique: true }
  },
  firstName: {
    type: String,
    trim: true,
    default: null
  },
  lastName: {
    type: String,
    trim: true,
    default: null
  },
  password: {
    type: String,
    select: false,
    default: null
  },
  permissions: {
    type: Array,
    default: [
      'user',
      'channels_list',
      'channels_create',
      'channels_delete',
      'projects_list',
      'projects_create',
      'projects_view',
      'projects_update',
      'projects_delete'
    ]
  },
  codeVerification: {
    type: String,
    default: null
  },
  parameters: {
    theme: {
      type: String,
      default: 'light',
      enum: ['light', 'dark']
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Date,
    default: null
  }
});

// Plugins
schema.plugin(aggregatePaginate);

// Statics
schema.statics.compare = async (candidatePassword, password) => {
  return await bcrypt.compareSync(candidatePassword, password);
};

// Hooks
schema.pre('save', async function () {
  const user = this;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    user.password = hash;
  }
});

schema.pre('updateOne', async function () {
  const user = this._update;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    this._update.password = hash;
  }
});

schema.pre('updateMany', async function () {
  const user = this._update;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    this._update.password = hash;
  }
});

// Indexes
schema.index({ id: 1 });

const Model = model('User', schema);

export { Model as default, schema as UserSchema };
