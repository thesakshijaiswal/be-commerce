document.addEventListener(
  "wheel",
  function (e) {
    if (
      document.activeElement.type === "number" &&
      document.activeElement === e.target
    ) {
      e.preventDefault();
    }
  },
  { passive: false },
);
