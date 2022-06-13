import { getRandomId } from "./helpers_module.js";


class LayerManager {
  #containerId = "";
  #width = 0;
  #height = 0;
  #layers = [];
  #selectedLayer = "";
  constructor(divId, width, height) {
    this.#containerId = divId;
    this.#width = width;
    this.#height = height;

    let container = document.getElementById(this.#containerId);
    if (container == null || container == undefined) {
      throw new Error(`Element with id '${this.#containerId}' not found.`);
    }

    container.style.width = this.#width + "px";
    container.style.height = this.#height + "px";
    container.style.position = "relative";
    //container.style.border = "1px solid black";
    // container.style.background = "red";
  }
  getLayers() {
    return this.#layers;
  }
  selectLayer(layerId) {
    this.#layers.forEach((elem) => {
      elem.isSelected = false;
    });
    const index = this.#layers.findIndex((layer) => layer.id === layerId);
    if (index != -1) {
      this.#layers[index].isSelected = true;
      this.#selectedLayer = layerId;
    }
  }
  deleteLayer(layerId) {
    const index = this.#layers.findIndex((layer) => layer.id === layerId);
    if (index != -1) {
      this.#layers.splice(index, 1);
    }
    return this.#layers;
  }
  renameLayer(layerId, newTitle) {
    const index = this.#layers.findIndex((layer) => layer.id === layerId);
    if (index != -1) {
      this.#layers[index].title = newTitle;
    }
    return this.#layers;
  }
  hideLayer(layerId) {
    const index = this.#layers.findIndex((layer) => layer.id === layerId);
    if (index != -1) {
      this.#layers[index].isVisible = false;
    }
  }
  unhideLayer(layerId) {
    const index = this.#layers.findIndex((layer) => layer.id === layerId);
    if (index != -1) {
      this.#layers[index].isVisible = true;
    }
  }
  lockLayer(layerId) {
    const index = this.#layers.findIndex((layer) => layer.id === layerId);
    if (index != -1) {
      this.#layers[index].isLocked = true;
    }
  }
  unlockLayer(layerId) {
    const index = this.#layers.findIndex((layer) => layer.id === layerId);
    if (index != -1) {
      this.#layers[index].isLocked = false;
    }
  }

  add() {
    let container = document.getElementById(this.#containerId);
    const id = getRandomId();
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    //canvas.style.background = getRandomColor();
    canvas.width = this.#width;
    canvas.height = this.#height;
    // canvas.style.objectFit="contain";
    container.appendChild(canvas);
    let ct = canvas.getContext("2d");
    const title = "Layer_" + (this.#layers.length + 1);
    //  ct.fillText(title, 50, 50);
    const obj = { id: id, title: title, isSelected: false, isLocked: false, isVisible: true, isMasked: false };
    this.#layers.unshift(obj);
    console.log("--layer added--");
    console.log(this.#layers);
    return this.#layers;
  }
  moveUp() {
    if (this.#layers.length <= 1) {
      return;
    }
    const index = this.#layers.findIndex((layer) => layer.id === this.#selectedLayer);
    if (index != -1) {
      let previous = index - 1;
      if (previous < 0) {
        previous = this.#layers.length - 1;
      }
      const temp = this.#layers[previous];
      this.#layers[previous] = this.#layers[index];
      this.#layers[index] = temp;
    }
    this.#sortCanvas();
  }
  moveDown() {
    if (this.#layers.length <= 1) {
      return;
    }
    const index = this.#layers.findIndex((layer) => layer.id === this.#selectedLayer);
    if (index != -1) {
      let next = index + 1;
      if (next >= this.#layers.length) {
        next = 0;
      }
      const temp = this.#layers[next];
      this.#layers[next] = this.#layers[index];
      this.#layers[index] = temp;
    }
    this.#sortCanvas();
  }
  #sortCanvas() {
    this.#layers.forEach((layer, index) => {
      document.getElementById(layer.id).style.zIndex = 99 - index;
    });
  }
}
export { LayerManager };
