const db = require('../db/models');
const { Op } = require('sequelize');
const controller = require('../socketInit');
const _ = require('lodash');

//! +
module.exports.addMessage = async (req, res, next) => {
  const {
    params: { interlocutorId },
    body: { messageBody, interlocutor },
    tokenData: { userId, firstName, lastName, displayName, avatar, email },
  } = req;
  const interlocutorIdInt = +interlocutorId;
  const participants = [userId, interlocutorIdInt].sort((a, b) => a - b);

  try {
    const [newConversation] = await db.Conversation.findOrCreate({
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

    const message = await db.Message.create({
      sender: userId,
      body: messageBody,
      conversation: newConversation.id,
    });

    const previewBody = {
      _id: newConversation.id,
      sender: userId,
      text: messageBody,
      createAt: message.createdAt,
      participants,
      blackList: [newConversation.blackList1, newConversation.blackList2],
      favoriteList: [
        newConversation.favoriteList1,
        newConversation.favoriteList2,
      ],
    };
    const responceMessage = {
      sender: userId,
      body: messageBody,
      conversation: newConversation.id,
      _id: message._id,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      participants,
    };

    controller.getChatController().emitNewMessage(interlocutorIdInt, {
      message: responceMessage,
      preview: {
        ...previewBody,
        interlocutor: {
          id: interlocutorIdInt,
          firstName,
          lastName,
          displayName,
          avatar,
          email,
        },
      },
    });

    res.send({
      message: responceMessage,
      preview: {
        ...previewBody,
        interlocutor,
      },
    });
  } catch (err) {
    next(err);
  }
};

//! +
module.exports.getChat = async (req, res, next) => {
  const {
    params: { interlocutorId },
    tokenData: { userId },
  } = req;
  const interlocutorIdInt = +interlocutorId;
  const participants = [userId, interlocutorIdInt].sort((a, b) => a - b);

  try {
    const conversation = await db.Conversation.findOne({
      where: {
        participant1: participants[0],
        participant2: participants[1],
      },
    });

    const interlocutor = await db.User.findByPk(interlocutorIdInt);

    const formatedInterlocutor = {
      firstName: interlocutor.firstName,
      lastName: interlocutor.lastName,
      displayName: interlocutor.displayName,
      id: interlocutor.id,
      avatar: interlocutor.avatar,
    };

    if (!conversation) {
      return res.send({
        messages: [],
        interlocutor: formatedInterlocutor,
      });
    }

    const messages = await db.Message.findAll({
      where: { conversation: conversation.id },
      order: [['createdAt', 'ASC']],
    });

    res.send({ messages, interlocutor: formatedInterlocutor });
  } catch (err) {
    next(err);
  }
};

//! +
module.exports.getPreview = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;

    const conversations = await db.Conversation.findAll({
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

    const interlocutors = [];
    conversations.forEach((conversation) => {
      interlocutors.push(
        conversation.participant1 === userId
          ? conversation.participant2
          : conversation.participant1
      );
    });

    const senders = await db.User.findAll({
      where: { id: interlocutors },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    const results = conversations.map((conversation) => {
      const message = conversation.Messages[0];
      const interlocutor = senders.find(
        (sender) =>
          sender.id === conversation.participant1 ||
          sender.id === conversation.participant2
      );

      return {
        _id: conversation.id,
        sender: message.sender,
        text: message.body,
        createAt: message.createdAt,
        participants: [conversation.participant1, conversation.participant2],
        blackList: [conversation.blackList1, conversation.blackList2],
        favoriteList: [conversation.favoriteList1, conversation.favoriteList2],
        interlocutor: {
          id: interlocutor.id,
          firstName: interlocutor.firstName,
          lastName: interlocutor.lastName,
          displayName: interlocutor.displayName,
          avatar: interlocutor.avatar,
        },
      };
    });

    res.send(results);
  } catch (err) {
    next(err);
  }
};

//! +
module.exports.blackList = async (req, res, next) => {
  try {
    const {
      body: { participants, blackListFlag },
      tokenData: { userId },
    } = req;
    const predicate = participants[0] === userId ? 'blackList1' : 'blackList2';

    const conversation = await db.Conversation.findOne({
      where: {
        participant1: participants[0],
        participant2: participants[1],
      },
    });

    if (!conversation) {
      return res.status(404).send({ message: 'Conversation not found' });
    }

    conversation[predicate] = blackListFlag;
    await conversation.save();

    const formattedConversation = {
      _id: conversation.id,
      participants: [conversation.participant1, conversation.participant2],
      blackList: [conversation.blackList1, conversation.blackList2],
      favoriteList: [conversation.favoriteList1, conversation.favoriteList2],
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };

    const interlocutorId = participants.find(
      (participant) => participant !== userId
    );

    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, formattedConversation);

    controller
      .getChatController()
      .emitChangeBlockStatus(userId, formattedConversation);

    res.send(formattedConversation);
  } catch (err) {
    next(err);
  }
};

//! +
module.exports.favoriteChat = async (req, res, next) => {
  try {
    const {
      body: { participants, favoriteFlag },
      tokenData: { userId },
    } = req;
    const predicate =
      participants[0] === userId ? 'favoriteList1' : 'favoriteList2';

    const conversation = await db.Conversation.findOne({
      where: {
        participant1: participants[0],
        participant2: participants[1],
      },
    });

    conversation[predicate] = favoriteFlag;
    await conversation.save();

    res.send({
      _id: conversation.id,
      participants,
      blackList: [conversation.blackList1, conversation.blackList2],
      favoriteList: [conversation.favoriteList1, conversation.favoriteList2],
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    });
  } catch (err) {
    res.send(err);
  }
};

//! +
module.exports.createCatalog = async (req, res, next) => {
  try {
    const {
      body: { chatId, catalogName },
      tokenData: { userId },
    } = req;

    const catalog = await db.Catalog.create({
      userId,
      catalogName,
    });

    await db.Chat.create({
      catalogId: catalog.id,
      conversationId: chatId,
    });

    await catalog.save();
    res.send({
      _id: catalog.id,
      userId: catalog.userId,
      catalogName: catalog.catalogName,
      chats: [chatId],
    });
  } catch (err) {
    next(err);
  }
};
//! +
module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const {
      params: { catalogId },
      body: { catalogName },
      tokenData: { userId },
    } = req;
    await db.Catalog.update(
      { catalogName },
      {
        where: {
          id: catalogId,
          userId,
        },
      }
    );

    const catalog = await db.Catalog.findOne({
      where: {
        id: catalogId,
        userId,
      },
      include: {
        model: db.Chat,
        attributes: ['conversationId'],
      },
    });

    const response = {
      _id: catalog.id,
      userId: catalog.userId,
      catalogName: catalog.catalogName,
      chats: catalog.Chats.map((chat) => chat.conversationId),
    };
    res.send(response);
  } catch (err) {
    next(err);
  }
};
//! +
module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const {
      params: { chatId },
      body: { catalogId },
      tokenData: { userId },
    } = req;

    const catalog = await db.Catalog.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    const chat = await db.Chat.create({
      catalogId: catalog.id,
      conversationId: chatId,
    });

    const updatedCatalog = await db.Catalog.findOne({
      where: { id: catalogId },
      include: [
        {
          model: db.Chat,
          attributes: ['conversationId'],
        },
      ],
    });

    res.send({
      id: updatedCatalog.id,
      name: updatedCatalog.name,
      chats: updatedCatalog.Chats.map((chat) => chat.conversationId),
    });
  } catch (err) {
    next(err);
  }
};
//! +
module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const {
      params: { chatId },
      query: { catalogId },
      tokenData: { userId },
    } = req;

    await db.Chat.destroy({
      where: {
        catalogId,
        conversationId: chatId,
      },
    });

    const catalog = await db.Catalog.findOne({
      where: {
        id: catalogId,
        userId,
      },
      include: {
        model: db.Chat,
        attributes: ['conversationId'],
      },
    });

    const response = {
      _id: catalog.id,
      userId: catalog.userId,
      catalogName: catalog.catalogName,
      chats: catalog.Chats.map((chat) => chat.conversationId),
    };
    console.log(response);

    res.send(response);
  } catch (err) {
    next(err);
  }
};
//! +
module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const {
      params: { catalogId },
      tokenData: { userId },
    } = req;

    await db.Catalog.destroy({
      where: { id: catalogId, userId },
    });

    res.status(200).send();
  } catch (err) {
    next(err);
  }
};
//! +
module.exports.getCatalogs = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;

    const catalogs = await db.Catalog.findAll({
      where: { userId },
      include: {
        model: db.Chat,
        attributes: ['conversationId'],
      },
    });

    const response = catalogs.map((catalog) => ({
      _id: catalog.id,
      userId: catalog.userId,
      catalogName: catalog.catalogName,
      chats: catalog.Chats.map((chat) => chat.conversationId),
    }));

    res.send(response);
  } catch (err) {
    next(err);
  }
};
