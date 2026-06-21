(function () {
  try {
    var storageKey = "studycentral-color-mode";
    var savedMode = localStorage.getItem(storageKey);
    var colorMode = savedMode === "dark" ? "dark" : "light";
    var root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(colorMode);
    root.style.colorScheme = colorMode;
  } catch {
    document.documentElement.classList.add("light");
    document.documentElement.style.colorScheme = "light";
  }
})();