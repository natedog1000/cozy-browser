import { InAppBrowser } from '@capgo/inappbrowser';
import { Capacitor } from '@capacitor/core';

/**
 * Opens a URL in the native WebView (on native platforms) or a new tab (on web)
 */
export const openInNativeBrowser = async (url: string): Promise<void> => {
  // Check if we're running on a native platform
  if (Capacitor.isNativePlatform()) {
    try {
      await InAppBrowser.open({ url });
    } catch (error) {
      console.error('Failed to open in native browser:', error);
      // Fallback to window.open if native browser fails
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  } else {
    // On web, open in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Close the native browser (if open)
 */
export const closeNativeBrowser = async (): Promise<void> => {
  if (Capacitor.isNativePlatform()) {
    try {
      await InAppBrowser.close();
    } catch (error) {
      console.error('Failed to close native browser:', error);
    }
  }
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
