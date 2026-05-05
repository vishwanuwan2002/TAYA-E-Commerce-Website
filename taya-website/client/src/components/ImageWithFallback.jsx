import { useState } from 'react';

function buildFallbackSvg({ width = 1000, height = 1250, background = '#f3f3f3', foreground = '#333333', label = 'Image' }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="${background}" />
      <g fill="${foreground}" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
        <text x="50%" y="48%" font-size="${Math.max(18, Math.min(width, height) / 12)}" font-weight="700">${label}</text>
        <text x="50%" y="56%" font-size="${Math.max(12, Math.min(width, height) / 24)}" opacity="0.7">Placeholder</text>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function ImageWithFallback({ src, alt, fallbackText, fallbackBackground = '#f3f3f3', fallbackForeground = '#333333', className = '', ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (currentSrc?.startsWith('data:image/svg+xml')) {
      return;
    }

    setCurrentSrc(
      buildFallbackSvg({
        label: fallbackText || alt || 'Image',
        background: fallbackBackground,
        foreground: fallbackForeground,
      })
    );
  };

  return <img src={currentSrc} alt={alt} className={className} onError={handleError} {...props} />;
}

export default ImageWithFallback;