//Creating a new scale value from existing scale value
const getNewScale = ({
  scale,
  minScale,
  maxScale,
  scaleSensitivity,
  deltaScale,
}) => {
  let newScale = scale + deltaScale / (scaleSensitivity / scale);
  newScale = Math.max(minScale, Math.min(newScale, maxScale));
  return newScale;
};

//Binding the state with zoom() function
const getZoom = (state) => ({
  zoom: (deltaScale) => {
    const { minScale, maxScale, scaleSensitivity } = state;
    const newScale = getNewScale({
      scale: state.transformation.scale,
      deltaScale,
      minScale,
      maxScale,
      scaleSensitivity,
    });

    state.element.style.transform = `scale(${newScale})`;

    state.transformation = {
      scale: newScale,
    };
  },
});

//event handlers for scrolling
const getHandlers = (state) => {
  const eventHandlers = {
    mouseDownHandler: (event) => {
      state.position = {
        // The current scroll
        left: state.element.parentElement.scrollLeft,
        top: state.element.parentElement.scrollTop,
        // Get the current mouse position
        x: event.clientX,
        y: event.clientY,
      };

      state.element.parentElement.style.cursor = "grabbing";
      state.element.parentElement.style.userSelect = "none";

      document.addEventListener("mousemove", eventHandlers.mouseMoveHandler);
      document.addEventListener("mouseup", eventHandlers.mouseUpHandler);
    },
    mouseMoveHandler: (e) => {
      // How far the mouse has been moved
      const dx = e.clientX - state.position.x;
      const dy = e.clientY - state.position.y;

      // Scroll the element
      state.element.parentElement.scrollTop = state.position.top - dy;
      state.element.parentElement.scrollLeft = state.position.left - dx;
    },
    mouseUpHandler: (event) => {
      document.removeEventListener("mousemove", eventHandlers.mouseMoveHandler);
      document.removeEventListener("mouseup", eventHandlers.mouseUpHandler);

      //To avoid problem when releasing the spcae button before releasing mouse button during scrolling
      if (state.element.parentElement.style.cursor !== "default") {
        state.element.parentElement.style.cursor = "grab";
      }

      state.element.parentElement.style.removeProperty("user-select");
    },
  };

  return eventHandlers;
};

//method used to return the actual methods to do different operations with state binded
const zoom = ({ minScale, maxScale, element, scaleSensitivity }) => {
  const state = {
    element,
    minScale,
    maxScale,
    scaleSensitivity,
    transformation: {
      scale: 1,
    },
    position: { top: 0, left: 0, x: 0, y: 0 },
  };
  return { zoom: getZoom(state), pan: getHandlers(state) };
};

export default zoom;
