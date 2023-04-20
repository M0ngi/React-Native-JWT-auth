import * as SecureStore from 'expo-secure-store';

export async function secureSave(key: string, value: any) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function secureRead(key: string) {
  return JSON.parse(await SecureStore.getItemAsync(key));
}

export async function secureDelete(key: string) {
    await SecureStore.deleteItemAsync(key);
  }