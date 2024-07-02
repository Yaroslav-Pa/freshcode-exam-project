const db = require('../db/models');
const CONSTANTS = require('../constants');

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort,
  isActiveStatus
) => {
  const object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  if (isActiveStatus) {
    Object.assign(object.where, {
      status: CONSTANTS.CONTEST_STATUS_ACTIVE,
    });
  } else {
    Object.assign(object.where, {
      status: {
        [db.Sequelize.Op.or]: [
          CONSTANTS.CONTEST_STATUS_FINISHED,
          CONSTANTS.CONTEST_STATUS_ACTIVE,
        ],
      },
    });
  }

  object.order.push(['id', 'desc']);
  return object;
};

function getPredicateTypes(index) {
  return { [db.Sequelize.Op.or]: [types[index].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

module.exports.getAllOfferStatusesInLitteral = () => {
  return Object.values(CONSTANTS.OFFER_STATUS).map((status) => {
    return toSequilizeLitteral(status);
  });
};

const toSequilizeLitteral = (text) => `'${text}'::enum_offers_status`;
