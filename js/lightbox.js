(() => {
  const dialog = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");

  if (!dialog || !lightboxImage) {
    return;
  }

  const galleryImages = Array.from(document.querySelectorAll(".photo-grid img"));

  const openLightbox = (image) => {
    const source = image.getAttribute("src");
    if (!source) {
      return;
    }

    lightboxImage.src = source;
    lightboxImage.alt = image.alt || "";
    dialog.showModal();
  };

  galleryImages.forEach((image) => {
    const figure = image.closest("figure");
    if (!figure) {
      return;
    }

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "photo-trigger";
    trigger.setAttribute("aria-label", `Open image: ${image.alt || "photo"}`);

    image.parentNode.insertBefore(trigger, image);
    trigger.appendChild(image);

    trigger.addEventListener("click", () => openLightbox(image));
  });

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      dialog.close();
    }
  });
})();
