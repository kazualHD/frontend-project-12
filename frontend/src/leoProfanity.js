import filter from 'leo-profanity';

const initLeoProfanity = () => {
  filter.list();
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));
};

export default initLeoProfanity;
