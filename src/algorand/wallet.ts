const WALLET_CONNECT = "walletconnect";

function setProviderStorage(provider: string, value: string): void {
  const key = `wc-${provider}`;
  localStorage.setItem(key, value);
}

function getProviderStorage(provider: string): string | null {
  const key = `wc-${provider}`;
  const value = localStorage.getItem(key);
  return value;
}

function removeProviderStorage(provider: string): void {
  const key = `wc-${provider}`;
  localStorage.removeItem(key);
}

// Store session details under "wc-${provider}" in localStorage
export function connectWcUpdateStorage(newProvider: string): void {
  const existingWcStorage = localStorage.getItem(WALLET_CONNECT);
  if (existingWcStorage) {
    setProviderStorage(newProvider, existingWcStorage);
  }
}

// Update current session details in localStorage with "wc-${provider}" if exists
export function changeWcUpdateStorage(newProvider: string): void {
  const existingProviderStorage = getProviderStorage(newProvider);
  if (existingProviderStorage) {
    localStorage.setItem(WALLET_CONNECT, existingProviderStorage);
  }
}

// Remove provider session details in localStorage
export function dcWcUpdateStorage(providerToRemove: string): void {
  removeProviderStorage(providerToRemove);
}