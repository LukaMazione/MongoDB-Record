require('dotenv').config();

const { TodoRecord } = require('./records/todo.record');
const { connectToMongo } = require('./utils/db');

let client;
(async () => {
  try {
    const connection = await connectToMongo();
    const { todos } = connection;
    client = connection.client;
    // const todo = await TodoRecord.find(todos, '65b6ee765f4df62b2faaa771');
    // console.log(todo);
    // await todo.update(todos);
    // console.log(await TodoRecord.findAll(todos));
    // await todo.delete(todos);

    /* eslint-disable no-restricted-syntax */
    // for await (const todo of await TodoRecord.findAllWithCursor(todos)) {
    //   // console.log(new TodoRecord(todo));
    //   const record = new TodoRecord(todo);
    //   record.title += '[updated]';
    //   await record.update(todos);
    // }
    const newRecord = new TodoRecord({
      title: 'Testowanie wstawiania nowego obiektu',
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
})();
