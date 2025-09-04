window.addEventListener("message", function (e) {
  if (e.data && "setHeight" === e.data.type) {
    const t = document.getElementById("custom-embed");
    t && (t.style.height = e.data.height + "px");
  }
});
