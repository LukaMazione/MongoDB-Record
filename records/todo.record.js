const { ObjectId } = require('mongodb');

class TodoRecord {
  constructor(obj) {
    this._id = new ObjectId(obj._id);
    this.title = obj.title;
    this._validate();
  }

  _validate() {
    if (this.title.trim().length < 5) {
      throw new Error('Title must be at least 5 characters');
    }

    if (this.title.length > 150) {
      throw new Error('Title must be maximum 150 characters');
    }
  }

  async insert(collection) {
    const { insertedId } = await collection.insertOne({
      _id: this._id,
      title: String(this.title),
    });
    this._id = insertedId;

    return insertedId;
  }

  async delete(collection) {
    await collection.deleteOne({
      _id: this._id,
    });
  }

  async update(collection) {
    await collection.replaceOne({
      _id: this._id,
    }, { title: String(this.title) });
  }

  static async findAll(collection) {
    return (await collection.find().toArray()).map((obj) => new TodoRecord(obj));
    // przy pobieraniu bardzo dużej ilości danych lepiej użyć for await of zamiast .Array()
  }

  static async findAllWithCursor(collection) {
    return /* await */ collection.find();
  }

  static async find(collection, id) {
    const item = await collection.findOne({ _id: new ObjectId(String(id)) });
    return item === null ? null : new TodoRecord(item);
  }
}

module.exports = {
  TodoRecord,
};
