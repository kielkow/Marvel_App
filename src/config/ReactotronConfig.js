import Reactotron from 'reactotron-react-js';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure().connect();

  tron.clear();

  // eslint-disable-next-line no-console
  console.tron = tron;
}
