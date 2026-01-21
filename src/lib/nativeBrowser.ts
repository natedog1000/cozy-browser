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
