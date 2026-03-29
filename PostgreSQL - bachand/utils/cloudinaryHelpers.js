export function extractPublicId(url) {
    if (!url || typeof url !== 'string') return null;
  
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      const parts = path.split('/').filter(Boolean);
  
      const uploadIndex = parts.indexOf('upload');
      if (uploadIndex === -1) return null;
  
      let start = uploadIndex + 1;

      if (parts[start]?.match(/^v\d+$/)) {
        start++;
      }
  
      while (
        start < parts.length - 1 &&
        parts[start].includes(',') &&
        (parts[start].includes('_') || parts[start].includes('/'))
      ) {
        start++;
      }

      const lastPart = parts[parts.length - 1];
      const nameWithoutExt = lastPart.replace(/\.[^/.]+$/, "");

      return parts.slice(start, -1).concat(nameWithoutExt).join('/');
    } catch (e) {
      console.warn('Public ID extraction failed for URL:', url, e.message);
      return null;
    }
  }