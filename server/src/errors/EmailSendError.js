const ApplicationError = require('./ApplicationError');

class EmailSendError extends ApplicationError{
  constructor (message) {
    super(message || 'Cant send email', 503);
  }
}

module.exports = EmailSendError;
