const db = require('../db/models');
const controller = require('../socketInit');
const _ = require('lodash');
const {
  createOrFindConversation,
  findMessages,
  getInterlocutors,
  formatCatalog,
  getCatalogWithChats,
  formatConversation,
  getConversationAndInterlocutor,
  getInterlocutorId,
  formatConversationForPreview,
  findAllConversationWithUser,
  createPreviewBodyAndResponseMessage,
} = require('../services/chat.service');

module.exports.addMessage = async (req, res, next) => {
  try {
    const {
      params: { interlocutorId },
      body: { messageBody, interlocutor },
      tokenData: { userId, firstName, lastName, displayName, avatar, email },
    } = req;
    const interlocutorIdInt = +interlocutorId;
    const participants = [userId, interlocutorIdInt].sort((a, b) => a - b);

    if (interlocutorIdInt === userId) {
      throw new Error('User cant send messages to himself');
    }

    const [newConversation] = await createOrFindConversation(participants);
    const message = await db.Message.create({
      sender: userId,
      body: messageBody,
      conversation: newConversation.id,
    });

    const [previewBody, responseMessage] = createPreviewBodyAndResponseMessage(
      message,
      newConversation,
      participants
    );

    controller.getChatController().emitNewMessage(interlocutorIdInt, {
      message: responseMessage,
      preview: {
        ...previewBody,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
          email,
        },
      },
    });

    res.send({
      message: responseMessage,
      preview: {
        ...previewBody,
        interlocutor,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const {
      params: { interlocutorId },
      tokenData: { userId },
    } = req;
    const interlocutorIdInt = +interlocutorId;
    const participants = [userId, interlocutorIdInt].sort((a, b) => a - b);

    const [conversation, interlocutor] = await getConversationAndInterlocutor(
      participants,
      interlocutorIdInt
    );

    if (!conversation) {
      return res.send({
        messages: [],
        interlocutor,
      });
    }

    const messages = await findMessages(conversation.id);

    res.send({ messages, interlocutor });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const conversations = await findAllConversationWithUser(userId);
    const senders = await getInterlocutors(conversations, userId);

    res.send(formatConversationForPreview(conversations, senders, userId));
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const {
      body: { participants, blackListFlag },
      tokenData: { userId },
    } = req;
    const interlocutorId = getInterlocutorId(participants, userId);
    const [conversation, interlocutor] = await getConversationAndInterlocutor(
      participants,
      interlocutorId
    );

    const predicate = participants[0] === userId ? 'blackList1' : 'blackList2';
    conversation[predicate] = blackListFlag;
    await conversation.save();

    const formattedConversation = formatConversation(
      conversation,
      participants
    );

    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, formattedConversation);

    res.send({ conversation: formattedConversation, interlocutor });
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const {
      body: { participants, favoriteFlag },
      tokenData: { userId },
    } = req;
    const interlocutorId = getInterlocutorId(participants, userId);
    const [conversation, interlocutor] = await getConversationAndInterlocutor(
      participants,
      interlocutorId
    );

    const predicate =
      participants[0] === userId ? 'favoriteList1' : 'favoriteList2';
    conversation[predicate] = favoriteFlag;
    await conversation.save();

    res.send({
      conversation: formatConversation(conversation, participants),
      interlocutor,
    });
  } catch (err) {
    res.send(err);
  }
};

//? Catalogs

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
      ...formatCatalog(catalog),
      chats: [chatId],
    });
  } catch (err) {
    next(err);
  }
};

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

    const catalog = await getCatalogWithChats(catalogId, userId);

    res.send(formatCatalog(catalog));
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const {
      params: { chatId },
      body: { catalogId },
      tokenData: { userId },
    } = req;

    await db.Chat.create({
      catalogId: catalogId,
      conversationId: chatId,
    });

    const updatedCatalog = await getCatalogWithChats(catalogId, userId);

    res.send(formatCatalog(updatedCatalog));
  } catch (err) {
    next(err);
  }
};

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

    const catalog = await getCatalogWithChats(catalogId, userId);

    res.send(formatCatalog(catalog));
  } catch (err) {
    next(err);
  }
};

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

    const response = catalogs.map((catalog) => formatCatalog(catalog));
    res.send(response);
  } catch (err) {
    next(err);
  }
};
