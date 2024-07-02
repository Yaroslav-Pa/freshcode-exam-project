const db = require('../db/models');
const _ = require('lodash');
const { Op } = require('sequelize');

const getConversation = async (participants) => {
  return await db.Conversation.findOne({
    where: {
      participant1: participants[0],
      participant2: participants[1],
    },
  });
};

const findInterlocutor = async (interlocutorId) => {
  return await db.User.findByPk(interlocutorId, {
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
};

module.exports.getInterlocutorId = (participants, userId) =>
  _.head(_.filter(participants, (id) => id !== userId));

module.exports.createOrFindConversation = async (participants) => {
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

module.exports.findMessages = async (conversationId) => {
  return await db.Message.findAll({
    where: { conversation: conversationId },
    order: [['createdAt', 'ASC']],
  });
};

module.exports.getInterlocutors = async (conversations, userId) => {
  const interlocutors = conversations.map((conversation) =>
    conversation.participant1 === userId
      ? conversation.participant2
      : conversation.participant1
  );

  return await db.User.findAll({
    where: { id: interlocutors },
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
};

module.exports.formatCatalog = (catalog) => ({
  _id: catalog.id,
  userId: catalog.userId,
  catalogName: catalog.catalogName,
  chats: catalog?.Chats?.map((chat) => chat.conversationId) || [],
});

module.exports.getCatalogWithChats = async (catalogId, userId) =>
  await db.Catalog.findOne({
    where: {
      id: catalogId,
      userId,
    },
    include: {
      model: db.Chat,
      attributes: ['conversationId'],
    },
  });

module.exports.formatConversation = (conversation, participants) => ({
  _id: conversation.id,
  participants,
  blackList: [conversation.blackList1, conversation.blackList2],
  favoriteList: [conversation.favoriteList1, conversation.favoriteList2],
  createdAt: conversation.createdAt,
  updatedAt: conversation.updatedAt,
});

module.exports.getConversationAndInterlocutor = async (
  participants,
  interlocutorId
) => {
  const conversation = await getConversation(participants);
  const interlocutor = await findInterlocutor(interlocutorId);
  return [conversation, interlocutor];
};

module.exports.formatConversationForPreview = (
  conversations,
  senders,
  userId
) => {
  return conversations.map((conversation) => {
    const message = conversation.Messages[0];
    const interlocutorId = _.head(
      _.filter(
        [conversation.participant1, conversation.participant2],
        (id) => id !== userId
      )
    );
    const interlocutor = senders.find((sender) => sender.id === interlocutorId);

    return {
      _id: conversation.id,
      sender: message.sender,
      text: message.body,
      createAt: message.createdAt,
      participants: [conversation.participant1, conversation.participant2],
      blackList: [conversation.blackList1, conversation.blackList2],
      favoriteList: [conversation.favoriteList1, conversation.favoriteList2],
      interlocutor,
    };
  });
};

module.exports.findAllConversationWithUser = async (userId) =>
  await db.Conversation.findAll({
    where: {
      [Op.or]: [{ participant1: userId }, { participant2: userId }],
    },
    include: [
      {
        model: db.Message,
        limit: 1,
        order: [['createdAt', 'DESC']],
      },
    ],
  });

module.exports.createPreviewBodyAndResponseMessage = (
  message,
  conversation,
  participants
) => {
  const previewBody = {
    _id: conversation.id,
    sender: message.sender,
    text: message.body,
    createAt: message.createdAt,
    participants,
    blackList: [conversation.blackList1, conversation.blackList2],
    favoriteList: [conversation.favoriteList1, conversation.favoriteList2],
  };
  const responseMessage = {
    sender: message.sender,
    body: message.body,
    conversation: conversation.id,
    _id: message._id,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    participants,
  };
  return [previewBody, responseMessage];
};
