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

// Security Console Warning
export const initSecurityMeasures = () => {
  // Use Vite's standard environment check
  if ((import.meta as any).env.PROD) {
    // Disable right click (Weak protection, but requested deterrent)
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Console warning
    console.log(
      '%cATENÇÃO!',
      'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px black;'
    );
    console.log(
      '%cEste é um recurso de navegador voltado para desenvolvedores. Se alguém lhe disse para copiar e colar algo aqui para habilitar um recurso ou "hackear" o site de alguém, isso é uma fraude e você dará a ele acesso à sua conta.',
      'font-size: 18px;'
    );
  }
};