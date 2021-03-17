import {createStore} from 'redux';

import {persistCombineReducers, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {reducers} from './reducers';

const config = {
  key: 'primary',
  storage:AsyncStorage,
  whitelist: ['user'],
};

const store = createStore(persistCombineReducers(config, reducers));

export const loadStore = async (setStoreReady) => {
  const storeVersion = 'version1';
  let persist = true;
  try {
    let newInstallCheck = await AsyncStorage.getItem(storeVersion);
    if (newInstallCheck == null) {
      persist = false;
    }
  } catch {
    persist = false;
  }
  let persistor = persistStore(store, {manualPersist: true}, async () => {
    await AsyncStorage.setItem(storeVersion, 'yes');
    setStoreReady(true);
  });
  if (!persist) {
    await persistor.purge();
    persistor.persist();
  } else {
    persistor.persist();
  }
};
export default store;
