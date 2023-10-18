import { config } from 'dotenv';
import { setupServer } from './server';
config();

(async function init() {
  try {
    const port = process.env.APP_PORT || 9932
    console.log('starting application...');
    const app = setupServer();
    app.listen(port, () => {
      console.log('listen port => ', port);
    })
  } catch (err) {
    console.log(err);
  }
})()