const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const CONSTANTS = require('../constants');

const archiveLogs = () => {
  const logFilePath = path.join(
    __dirname,
    '..',
    '..',
    CONSTANTS.LOGGER_DIR,
    CONSTANTS.LOGGER_FILENAME
  );
  const archiveDirectory = path.join(
    __dirname,
    '..',
    '..',
    CONSTANTS.ARCHIVE_DIR
  );

  if (!fs.existsSync(archiveDirectory)) {
    fs.mkdirSync(archiveDirectory);
  }

  if (fs.existsSync(logFilePath)) {
    const logData = fs
      .readFileSync(logFilePath, 'utf8')
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => JSON.parse(line));
    if (logData.length !== 0) {
      const transformedData = logData.map((log) => ({
        message: log.message,
        code: log.code,
        time: log.time,
      }));

      const archiveFileName = `${Date.now()}.json`;
      const archiveFilePath = path.join(archiveDirectory, archiveFileName);

      fs.writeFileSync(
        archiveFilePath,
        JSON.stringify(transformedData, null, 2)
      );
      fs.writeFileSync(logFilePath, '');
    }
    console.log('Errors archived');
  }
};

cron.schedule('46 18 * * *', archiveLogs);
