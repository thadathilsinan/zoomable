# Zoomable

Zoomable is a tiny library to make the contents of any containers in HTML zoomable. This is really a lightweight code optimised for better performance.

### Features

- Zoom
- Pan (with scrollbars)

## Configuration

There is only few options you have to configure. These are the data you have to pass when initialising the library.

| Parameter Name   | Description                                                                                      | Required          |
| ---------------- | ------------------------------------------------------------------------------------------------ | ----------------- |
| idOfElement      | The ID of the container element                                                                  | **Yes**           |
| minScale         | Minimum zoomable value (This is a number. **1** is the original size of the content)             | No (Default: 0.5) |
| maxScale         | Maximum zoomable value (This is a number. **1** is the original size of the content)             | No (Default: 10)  |
| scaleSensitivity | Sensitivity of zoom. (This is a number. If value if higher then zooming sensitivity will be low) | No (Default: 10   |

## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Usage

> **NOTE :** This library is made for React application. May not work perfectly for other use cases

Install the package using npm

```bash
npm install @thadathilsinan/zoomable
```

Import the module.

```javascript
import initializeZoomable from "@thadathilsinan/zoomable";
```

Initialise the library

```javascript
initializeZoomable(idOfElement, minScale, maxScale, scaleSensitivity);
```

Now your container will be zoomable. You can zoom the content by pressing **Ctrl + Mouse Wheel** or **Trackpad zoom gesture**
You can pan the content after zoom in case of overflow by holding the **Spacebar + Drag with mouse**
