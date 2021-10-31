import zoom from "./zoomable";

export default function initializeZoomable(
  idOfElement,
  minScale = 0.5,
  maxScale = 10,
  scaleSensitivity = 10
) {
  const container = document.querySelector(`#${idOfElement}`);
  const instance = zoom({
    minScale: minScale,
    maxScale: maxScale,
    element: container.children[0],
    scaleSensitivity: scaleSensitivity,
  });

  container.children[0].style.transformOrigin = `${0}px ${0}px`;

  container.addEventListener("wheel", (event) => {
    if (!event.ctrlKey) {
      return;
    }
    event.preventDefault();
    instance.zoom.zoom(Math.sign(event.deltaY) > 0 ? -1 : 1);
  });

  document.addEventListener("keydown", (event) => {
    //Scroll when space key pressed
    if (event.code === "Space") {
      event.preventDefault();

      //To avoid issue whith holding the space bar, repeatedly set the cursor as "grab".
      if (container.style.cursor !== "grabbing") {
        container.style.cursor = "grab";
      }
      container.addEventListener("mousedown", instance.pan.mouseDownHandler);
    }

    //Zoom cursor when Ctrl key pressed
    if (event.key === "Control") {
      container.style.cursor = "zoom-in";
    }
  });

  document.addEventListener("keyup", (event) => {
    //Reset the cursor and events to scroll
    if (event.code === "Space") {
      event.preventDefault();
      container.style.cursor = "default";
      container.removeEventListener("mousedown", instance.pan.mouseDownHandler);
    }

    //Reset the cursor to default when Ctrl key released
    if (event.key === "Control") {
      container.style.cursor = "default";
    }
  });
}
