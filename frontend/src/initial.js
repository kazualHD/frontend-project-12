import initI18next from './i18next';
import initSocket from './socket';
import initLeoProfanity from './leoProfanity';

const initializeApp = async () => {
  const i18next = await initI18next('ru');
  const socket = initSocket(i18next);
  initLeoProfanity();

  return { i18next, socket };
};

export default initializeApp;
