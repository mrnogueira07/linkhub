/**
 * Security Utilities
 * Provides functions to sanitize inputs and prevent XSS attacks via URL injection.
 */

// Protocols allowed for links. Everything else (like javascript:, vbscript:, data:) is blocked.
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:', 'whatsapp:'];

export const sanitizeUrl = (url: string): string => {
  try {
    // If it's a relative URL (anchor or internal), allow it
    if (url.startsWith('/') || url.startsWith('#')) {
      return url;
    }

    const parsedUrl = new URL(url);
    
    // Check if protocol is allowed
    if (ALLOWED_PROTOCOLS.includes(parsedUrl.protocol)) {
      return url;
    }
    
    // If invalid protocol, return safe fallback
    console.warn(`Blocked potentially malicious URL: ${url}`);
    return '#blocked';
  } catch (e) {
    // If URL parsing fails, it might be a partial string or valid mailto without protocol in some parsers
    // For safety, if it contains 'javascript:', block it immediately.
    if (url.toLowerCase().includes('javascript:') || url.toLowerCase().includes('data:')) {
      return '#blocked';
    }
    return url;
  }
};

export const sanitizeText = (text: string): string => {
  // React already escapes text content, but this is an extra layer 
  // if we ever decide to use dangerous HTML rendering (which we shouldn't).
  return text.replace(/[<>]/g, '');
};

// Security Console Warning and Deterrents
export const initSecurityMeasures = () => {
  // Prevent common simple scraping patterns
  if (typeof window !== 'undefined') {
    // Disable context menu
    if ((import.meta as any).env.PROD) {
      document.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // Anti-debugging honeypot
    const trap = () => {
      const start = Date.now();
      // eslint-disable-next-line no-debugger
      debugger; // This will trigger if DevTools is open and paused on debugger
      const end = Date.now();
      if (end - start > 100) {
        console.warn('%cSECURITY ALERT: Debugger detected. Activity logged.', 'color: red; font-weight: bold;');
      }
    };

    // Run trap occasionally
    setInterval(() => {
      if ((import.meta as any).env.PROD) {
        trap();
      }
    }, 5000);

    // Enhanced Console warning
    if ((import.meta as any).env.PROD) {
      console.log(
        '%c🛑 PARE!',
        'color: #ff0000; font-size: 50px; font-weight: bold; -webkit-text-stroke: 1px black;'
      );
      console.log(
        '%cEsta é uma área restrita para desenvolvedores. Se alguém lhe pediu para colar um código aqui, você está sendo vítima de um ataque de engenharia social (Self-XSS).',
        'font-size: 20px; color: #ff5555;'
      );
      console.log(
        '%cTentativas de acesso não autorizado são monitoradas e registradas.',
        'font-size: 14px; font-style: italic;'
      );
    }
  }
};

// Fake Honeypot Trigger for UI
export const triggerHoneypot = () => {
  console.error('%cTRAP TRIGGERED: Unauthorized access to shadowed administrative elements. Remote IP flagged.', 'background: red; color: white; padding: 10px; font-size: 16px; border-radius: 5px;');
};