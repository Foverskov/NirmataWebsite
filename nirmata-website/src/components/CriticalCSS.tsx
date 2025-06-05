// Critical CSS for EPK - Inlined for optimal performance
export const criticalCSS = `
  /* Critical EPK Styles - Above the fold */
  .epk-critical {
    --epk-cyan: #00ffff;
    --epk-pink: #ff007f;
    --nirmata-primary: #6366f1;
    --nirmata-dark: #0f0f23;
    --nirmata-light: #f8fafc;
  }

  /* Hero section critical styles */
  .epk-hero {
    position: fixed;
    inset: 0;
    z-index: 40;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: black;
    cursor: pointer;
    transition: all 1000ms;
  }

  .epk-hero.hidden {
    opacity: 0;
    visibility: hidden;
  }

  /* Album art critical styles */
  .epk-album-art {
    position: relative;
    width: 100%;
    max-width: 28rem;
    height: 24rem;
    margin: 2rem 0;
    border-radius: 0.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 255, 255, 0.2);
    transition: all 300ms;
  }

  .epk-album-art:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 255, 255, 0.3);
  }

  /* Typography critical styles */
  .epk-title {
    font-size: 3rem;
    margin-bottom: 2rem;
    letter-spacing: 0.25em;
    background: linear-gradient(135deg, var(--epk-cyan), var(--epk-pink));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  @media (min-width: 768px) {
    .epk-title {
      font-size: 5rem;
    }
  }

  /* Navigation critical styles */
  .epk-nav {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 50;
    transition: opacity 500ms;
  }

  .epk-nav.hidden {
    opacity: 0;
  }

  /* Loading and transition optimizations */
  .epk-loading {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Prevent layout shift */
  .epk-image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .epk-image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: criticalCSS,
      }}
    />
  );
}
