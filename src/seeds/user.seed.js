// Models
import UserModel from '@/models/user.model';
// Utils
import { insert } from '@/utils/seed.util';

// UserId
const id = '6108db02bb8ea9e69b2984a1';

// Data
const data = [
  {
    _id: id,
    firstName: 'Johnny',
    lastName: 'Depp',
    email: 'johnny.depp@kpr.com',
    password: '86DWtgTb',
    parameters: {
      theme: 'dark'
    },
    permissions: [
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
  }
];

export default async () => await insert(UserModel, data);
