export function parseYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return null;

  try {
    const trimmed = url.trim();
    const parsed = new URL(trimmed);

    let videoId = null;

    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1).split('?')[0].split('/')[0];
    }
 
    else if (parsed.pathname.includes('/embed/')) {
      videoId = parsed.pathname.split('/embed/')[1].split('?')[0].split('/')[0];
    }

    else if (parsed.searchParams.has('v')) {
      videoId = parsed.searchParams.get('v');
    }

    else if (parsed.pathname.includes('/shorts/')) {
      videoId = parsed.pathname.split('/shorts/')[1].split('?')[0].split('/')[0];
    }

    else if (parsed.pathname.includes('/live/')) {
      videoId = parsed.pathname.split('/live/')[1].split('?')[0].split('/')[0];
    }

    if (!videoId || videoId.length < 5) return null;

    let startSeconds = 0;
    const tParam = parsed.searchParams.get('t') || parsed.searchParams.get('start');

    if (tParam) {
      if (/^\d+$/.test(tParam)) {
        startSeconds = parseInt(tParam);
      } else {
        const match = tParam.match(/(\d+)(h|m|s)/g);
        if (match) {
          match.forEach(part => {
            const val = parseInt(part);
            if (part.includes('h')) startSeconds += val * 3600;
            if (part.includes('m')) startSeconds += val * 60;
            if (part.includes('s')) startSeconds += val;
          });
        }
      }
    }

    return {
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}${startSeconds ? `?start=${startSeconds}` : ''}`
    };

  } catch (e) {
    return null;
  }
}