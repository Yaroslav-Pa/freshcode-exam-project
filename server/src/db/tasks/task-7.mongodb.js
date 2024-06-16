const db = new Mongo().getDB("shm-chat");

db.messages.aggregate([
  {
    $match: {
      body: { $regex: "паровоз", $options: "i" }
    }
  },
  {
    $count: "trainMessageCount"
  }
]);