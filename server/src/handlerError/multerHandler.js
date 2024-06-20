const { MulterError } = require('multer');
const BadRequestError = require('../errors/BadRequestError');

module.exports = async (err, req, res, next) => {
  //TODO! move to ./handler?
  if(err instanceof MulterError) {
    return next(new BadRequestError('Invalid file / files'))
  }

  next(err);
}