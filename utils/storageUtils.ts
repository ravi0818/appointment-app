import AsyncStorage from '@react-native-async-storage/async-storage';

const STATE_KEY_PREFIX = 'appState_';

// Save state to AsyncStorage
export const saveState = async (key: string, state: any): Promise<void> => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem(`${STATE_KEY_PREFIX}${key}`, serializedState);
  } catch (err) {
    console.error(`Failed to save state for ${key}`, err);
  }
};

// Load state from AsyncStorage
export const loadState = async (key: string): Promise<any> => {
  try {
    const serializedState = await AsyncStorage.getItem(`${STATE_KEY_PREFIX}${key}`);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(`Failed to load state for ${key}`, err);
    return undefined;
  }
};
