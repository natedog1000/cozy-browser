import { InAppBrowser } from '@capgo/inappbrowser';
import { Capacitor } from '@capacitor/core';

/**
 * Check if running on a native platform (iOS/Android)
 */
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Check if a URL is external (not an internal app route)
 */
export const isExternalUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Internal URLs start with kisscam:// or are relative paths
  if (url.startsWith('kisscam://') || url.startsWith('/')) {
    return false;
  }
  
  // Check if it's a valid external URL
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Opens a URL in the native in-app WebView (on native platforms only)
 * Returns true if opened successfully, false if not on native platform
 */
export const openInNativeWebView = async (url: string): Promise<boolean> => {
  if (!Capacitor.isNativePlatform()) {
    console.log('Not on native platform, cannot open native WebView');
    return false;
  }

  try {
    await InAppBrowser.open({ url });
    return true;
  } catch (error) {
    console.error('Failed to open in native WebView:', error);
    return false;
  }
};

/**
 * Close the native WebView (if open)
 */
export const closeNativeWebView = async (): Promise<void> => {
  if (Capacitor.isNativePlatform()) {
    try {
      await InAppBrowser.close();
    } catch (error) {
      console.error('Failed to close native WebView:', error);
    }
  }
};

/**
 * Normalize a URL for navigation
 */
export const normalizeUrl = (url: string): string => {
  if (!url) return url;
  
  // Already has protocol
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('kisscam://')) {
    return url;
  }
  
  // Add https:// if it looks like a domain
  if (url.includes('.') && !url.includes(' ')) {
    return `https://${url}`;
  }
  
  return url;
};
