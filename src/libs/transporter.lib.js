import nodemailer from 'nodemailer';
// Constants
import {
  PROJECT_MODE,
  TRANSPORTER_SERVICE,
  TRANSPORTER_EMAIL,
  TRANSPORTER_PASSWORD
} from '@/constants/config.constant';

const transporter = nodemailer.createTransport({
  service: TRANSPORTER_SERVICE,
  send: PROJECT_MODE !== 'development',
  preview: PROJECT_MODE === 'development',
  auth: {
    user: TRANSPORTER_EMAIL,
    pass: TRANSPORTER_PASSWORD
  }
});

export default transporter;
