(function () {
  if (
    document.location.href.indexOf("?") === -1 ||
    document.location.href.indexOf("/webhp?") !== -1
  ) {
    const timeMap = [
      { start: 0, end: 2, file: "00.jpg" },
      { start: 2, end: 4, file: "02.jpg" },
      { start: 4, end: 6, file: "04.jpg" },
      { start: 6, end: 8, file: "06.jpg" },
      { start: 8, end: 10, file: "08.jpg" },
      { start: 10, end: 12, file: "10.jpg" },
      { start: 12, end: 14, file: "12.jpg" },
      { start: 14, end: 16, file: "14.jpg" },
      { start: 16, end: 18, file: "16.jpg" },
      { start: 18, end: 20, file: "18.jpg" },
      { start: 20, end: 22, file: "20.jpg" },
      { start: 22, end: 24, file: "22.jpg" }
    ];

    function getCurrentBackground() {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      if (hour === 3 && minute === 14) return "0314.jpg";

      for (const { start, end, file } of timeMap) {
        if (hour >= start && hour < end) {
          return file;
        }
      }
      return "00.jpg"; // fallback
    }

    function applyBackground(bgFile) {
      const bgUrl = chrome.runtime.getURL(bgFile);
      const aspectRatio = 900 / 250; // 3.6

      let bgDiv = document.getElementById("theme-bg-layer");
      if (!bgDiv) {
        bgDiv = document.createElement("div");
        bgDiv.id = "theme-bg-layer";
        Object.assign(bgDiv.style, {
          position: "fixed",
          top: "60px",
          left: "0",
          width: "100vw",
          zIndex: "-1",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundAttachment: "scroll",
          pointerEvents: "none",
          transition: "background-image 0.5s ease-in-out",
          backgroundSize: "100% 100%" // fit container, we control aspect
        });
        document.body.prepend(bgDiv);
      }

      // compute height on current viewport
      const vw = window.innerWidth;
      const height = Math.round(vw / aspectRatio); // maintain 3.6:1
      bgDiv.style.height = `${height}px`;
      bgDiv.style.backgroundImage = `url("${bgUrl}")`;

      window.addEventListener("resize", () => {
        const newHeight = Math.round(window.innerWidth / aspectRatio);
        bgDiv.style.height = `${newHeight}px`;
      });

      const langElement = document.getElementById("gws-output-pages-elements-homepage_additional_languages__als");
      if (langElement) {
        langElement.style.display = "none";
      }
    }

    function startImageUpdater() {
      let lastBg = null;

      function update() {
        const newBg = getCurrentBackground();
        if (newBg !== lastBg) {
          applyBackground(newBg);
          lastBg = newBg;
        }
      }

      update();
      setInterval(update, 60000);
    }

    startImageUpdater();
  }
})();
