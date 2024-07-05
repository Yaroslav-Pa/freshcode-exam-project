const ApplicationError = require('./ApplicationError');

class NotUniqueEmail extends ApplicationError{
  constructor (message) {
    super(message || 'user with this email already exist', 409);
  }
}

module.exports = NotUniqueEmail;
