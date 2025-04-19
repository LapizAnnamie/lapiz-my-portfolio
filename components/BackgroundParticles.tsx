"use client";
import { useEffect } from "react";

const BackgroundParticles = () => {
  useEffect(() => {
    const loadScript = (
      src: string,
      type = "text/javascript",
      module = false
    ) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.type = module ? "module" : type;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        await loadScript(
          "https://cdn.jsdelivr.net/npm/tsparticles@1.28.0/dist/tsparticles.min.js"
        );
        await loadScript(
          "https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/custom-elements-es5-adapter.js"
        );
        await loadScript(
          "https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/webcomponents-loader.js"
        );
        await loadScript(
          "https://cdn.jsdelivr.net/npm/web-particles@1.1.0/dist/web-particles.min.js",
          "module",
          true
        );
      } catch (error) {
        console.error("Error loading web-particles scripts:", error);
      }
    };

    loadAllScripts();
  }, []);

  return (
    <web-particles
      id="tsparticles"
      options='{
        "fps_limit": 60,
        "interactivity": {
        "detectsOn": "canvas",
        "events": {
            "onClick": { "enable": true, "mode": "push" },
            "onHover": { "enable": true, "mode": "repulse" },
            "resize": true
        },
        "modes": {
            "push": { "particles_nb": 4 },
            "repulse": { "distance": 200, "duration": 0.4 }
        }
        },
        "particles": {
        "color": { "value": "#FF8EB6" },
        "links": { "color": "#FF8EB6", "distance": 150, "enable": true, "opacity": 0.4, "width": 1 },
        "move": { "bounce": false, "direction": "none", "enable": true, "outMode": "out", "random": false, "speed": 0.5, "straight": false },
        "number": { "density": { "enable": true, "area": 800 }, "value": 80 },
        "opacity": { "value": 0.5 },
        "shape": { "type": "circle" },
        "size": { "random": true, "value": 5 }
        },
        "detectRetina": true
    }'
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        PointerEvents: "auto",
        backgroundImage: "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    />
  );
};

export default BackgroundParticles;
