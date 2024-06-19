const db = require('../../db/models');
const { Op } = require('sequelize');

const getConversation = async (participants) => {
  return await db.Conversation.findOne({
    where: {
      participant1: participants[0],
      participant2: participants[1],
    },
  });
};

const createOrFindConversation = async (participants) => {
  return await db.Conversation.findOrCreate({
    where: {
      participant1: participants[0],
      participant2: participants[1],
    },
    defaults: {
      participant1: participants[0],
      participant2: participants[1],
      blackList1: false,
      blackList2: false,
      favoriteList1: false,
      favoriteList2: false,
    },
  });
};

const findMessages = async (conversationId) => {
  return await db.Message.findAll({
    where: { conversation: conversationId },
    order: [['createdAt', 'ASC']],
  });
};

const findInterlocutor = async (interlocutorId) => {
  return await db.User.findByPk(interlocutorId, {
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
};

const getInterlocutors = async (conversations, userId) => {
  const interlocutors = [];
  conversations.forEach((conversation) => {
    interlocutors.push(
      conversation.participant1 === userId
        ? conversation.participant2
        : conversation.participant1
    );
  });

  return await db.User.findAll({
    where: { id: interlocutors },
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
};

const formatInterlocutor = (interlocutor) => ({
  id: interlocutor.id,
  firstName: interlocutor.firstName,
  lastName: interlocutor.lastName,
  displayName: interlocutor.displayName,
  avatar: interlocutor.avatar,
});

module.exports = {
  getConversation,
  createOrFindConversation,
  findMessages,
  findInterlocutor,
  getInterlocutors,
  formatInterlocutor,
};
