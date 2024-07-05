const nodemailer = require('nodemailer');
const { EMAIL, OFFER_STATUS } = require('../constants');
const EmailSendError = require('../errors/EmailSendError');

const OFFER_STATUS_MESSAGES = {
  [OFFER_STATUS.PENDING]: 'Your offer was approved after review',
  [OFFER_STATUS.FAIL_REVIEW]: 'Your offer was rejected after review',
};

module.exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    ...EMAIL,
  },
});

module.exports.mailOptions = (mail, status, userName) => {
  const statusMessage = OFFER_STATUS_MESSAGES[status];
  return {
    from: EMAIL.user,
    to: mail,
    subject: statusMessage,
    text: `
      Hi ${userName},

      We wanted to let you know that ${statusMessage.toLowerCase()}.

      If you have any questions or need further assistance, feel free to reach out to our support team.

      Thank you for being a part of SquadHelp!

      Best regards,
      The SquadHelp Team
    `,
  };
};

module.exports.mailErrorHandler = (error, next) => {
  if (error) {
    next(new EmailSendError(`Failed to send message: ${error.message}`));
  }
};
