/**
 * Check if running on a native platform (iOS/Android)
 * Uses dynamic import to avoid React context issues
 */
export const isNativePlatform = (): boolean => {
  // Check for Capacitor's native bridge
  return !!(window as any).Capacitor?.isNativePlatform?.();
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
  if (!isNativePlatform()) {
    console.log('Not on native platform, cannot open native WebView');
    return false;
  }

  try {
    // Dynamic import to avoid bundling issues with React
    const { InAppBrowser } = await import('@capgo/inappbrowser');
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
  if (isNativePlatform()) {
    try {
      const { InAppBrowser } = await import('@capgo/inappbrowser');
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
