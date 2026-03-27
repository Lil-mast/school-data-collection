export default function Head() {
  return (
    <>
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap"
        rel="stylesheet"
      />
      {/* Material Symbols */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Tailwind CDN + same config as your original HTML template */}
      <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
      <script
        id="tailwind-config"
        dangerouslySetInnerHTML={{
          __html: `
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "on-error-container": "#410002",
              "on-secondary-fixed": "#1b1b1b",
              "on-surface-variant": "#474747",
              "on-tertiary-container": "#ffffff",
              "surface-container-highest": "#e2e2e2",
              "on-primary": "#e2e2e2",
              "primary": "#000000",
              "surface-container-high": "#e8e8e8",
              "surface": "#f9f9f9",
              "on-secondary-fixed-variant": "#3b3b3b",
              "tertiary": "#3b3b3b",
              "on-background": "#1b1b1b",
              "surface-tint": "#5e5e5e",
              "outline-variant": "#c6c6c6",
              "primary-fixed-dim": "#474747",
              "tertiary-container": "#747474",
              "surface-variant": "#e2e2e2",
              "background": "#f9f9f9",
              "secondary-fixed": "#c6c6c6",
              "secondary": "#5e5e5e",
              "on-error": "#ffffff",
              "on-primary-fixed-variant": "#e2e2e2",
              "surface-container-low": "#f3f3f3",
              "surface-dim": "#dadada",
              "secondary-fixed-dim": "#ababab",
              "primary-fixed": "#5e5e5e",
              "on-surface": "#1b1b1b",
              "on-secondary-container": "#1b1b1b",
              "outline": "#777777",
              "on-secondary": "#ffffff",
              "inverse-primary": "#c6c6c6",
              "primary-container": "#3b3b3b",
              "surface-bright": "#f9f9f9",
              "inverse-surface": "#303030",
              "tertiary-fixed": "#5e5e5e",
              "tertiary-fixed-dim": "#474747",
              "surface-container-lowest": "#ffffff",
              "error-container": "#ffdad6",
              "on-primary-fixed": "#ffffff",
              "on-primary-container": "#ffffff",
              "on-tertiary-fixed-variant": "#e2e2e2",
              "on-tertiary-fixed": "#ffffff",
              "on-tertiary": "#e2e2e2",
              "error": "#ba1a1a",
              "secondary-container": "#d4d4d4",
              "surface-container": "#eeeeee",
              "inverse-on-surface": "#f1f1f1",
              "surface-container-lowest": "#ffffff",
            },
            fontFamily: {
              headline: ["Newsreader"],
              body: ["Manrope"],
              label: ["Manrope"],
            },
            borderRadius: {
              DEFAULT: "0.125rem",
              lg: "0.25rem",
              xl: "0.5rem",
              full: "0.75rem",
            },
          },
        },
      }
      `,
        }}
      />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
          font-family: 'Manrope', sans-serif;
          background-color: #f9f9f9;
        }
        h1, h2, h3 {
          font-family: 'Newsreader', serif;
        }
        .editorial-gradient {
          background: linear-gradient(to bottom, rgba(249, 249, 249, 0), rgba(249, 249, 249, 1));
        }
      `}</style>
    </>
  );
}

