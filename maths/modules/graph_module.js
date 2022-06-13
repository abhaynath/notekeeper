"use strict";

class Graph {
  #xOrigin;
  #yOrigin;
  #xDisplayScale;
  #yDisplayScale;
  #textWidth = 15;
  #textHeight = 20;
  constructor(pXMin, pXMax, pYMin, pYMax, pX0, pY0, pXWidth, pYWidth) {
    //  context = context;
    this.#xOrigin = pX0;
    this.#yOrigin = pY0;
    this.xWidth = pXWidth;
    this.yWidth = pYWidth;

    this.#xDisplayScale = (pXMax - pXMin) / pXWidth;
    this.#yDisplayScale = (pYMax - pYMin) / pYWidth;

    this.xMin = pXMin / this.#xDisplayScale + this.#xOrigin;
    this.xMax = pXMax / this.#xDisplayScale + this.#xOrigin;
    this.yMin = this.#yOrigin - pYMin / this.#yDisplayScale;
    this.yMax = this.#yOrigin - pYMax / this.#yDisplayScale;
    this.textXPosition = this.#xOrigin - this.#textWidth;
    this.textYPosition = this.#yOrigin;
  }
  drawGrid(gridContext, xmajor, xminor, ymajor, yminor, majorLineColor = "#999", minorLineColor = "#ccc") {
    console.log("Drawing graph");
    // gridContext.scale(1, 1);
    const xTickMajor = xmajor / this.#xDisplayScale;
    const xTickMinor = xminor / this.#xDisplayScale;
    const yTickMajor = ymajor / this.#yDisplayScale;
    const yTickMinor = yminor / this.#yDisplayScale;
    // draw major grid lines
    gridContext.strokeStyle = majorLineColor;
    gridContext.lineWidth = 1;
    gridContext.beginPath();
    let yy = this.yMax;
    do {
      gridContext.moveTo(this.xMin, yy);
      gridContext.lineTo(this.xMax, yy);
      yy += yTickMajor;
    } while (yy <= this.yMin);
    let xx = this.xMin;
    do {
      gridContext.moveTo(xx, this.yMin);
      gridContext.lineTo(xx, this.yMax);
      xx += xTickMajor;
    } while (xx <= this.xMax);
    gridContext.stroke();
    // draw minor grid lines
    gridContext.strokeStyle = minorLineColor;
    gridContext.lineWidth = 0.5;
    gridContext.beginPath();
    yy = this.yMax;
    do {
      gridContext.moveTo(this.xMin, yy);
      gridContext.lineTo(this.xMax, yy);
      yy += yTickMinor;
    } while (yy <= this.yMin);
    xx = this.xMin;
    do {
      gridContext.moveTo(xx, this.yMin);
      gridContext.lineTo(xx, this.yMax);
      xx += xTickMinor;
    } while (xx <= this.xMax);
    gridContext.stroke();
    //display values
    gridContext.font = "10pt Arial";
    gridContext.fillStyle = "#000000";
    gridContext.textAlign = "right";
    gridContext.textBaseline = "top";
    yy = this.yMax;
    do {
      this.yDisplay = (this.#yOrigin - yy) * this.#yDisplayScale;
      gridContext.fillText(this.yDisplay, this.textXPosition + 5, yy - this.#textHeight / 2);
      yy += yTickMajor;
    } while (yy <= this.yMin);
    gridContext.textAlign = "left";
    gridContext.textBaseline = "top";
    xx = this.xMin;
    do {
      this.xDisplay = (xx - this.#xOrigin) * this.#xDisplayScale;
      gridContext.fillText(this.xDisplay, xx - this.#textWidth + 10, this.textYPosition + 5);
      xx += xTickMajor;
    } while (xx <= this.xMax);
  }
  drawAxes(axisContext, xlabel, ylabel, color = "#000") {
    console.log("Drawing axes");
    if (typeof xlabel === "undefined") xlabel = "x";
    if (typeof ylabel === "undefined") ylabel = "y";
    axisContext.strokeStyle = color;
    axisContext.lineWidth = 2;
    axisContext.beginPath();
    axisContext.moveTo(this.xMin, this.#yOrigin);
    axisContext.lineTo(this.xMax, this.#yOrigin);
    axisContext.moveTo(this.#xOrigin, this.yMin);
    axisContext.lineTo(this.#xOrigin, this.yMax);
    axisContext.stroke();
    //axis labels
    axisContext.font = "12pt Arial";
    axisContext.fillStyle = color;
    axisContext.textAlign = "left";
    axisContext.textBaseline = "top";
    axisContext.fillText(xlabel, this.xMax + 0.75 * this.#textWidth, this.textYPosition - this.#textHeight / 2);
    axisContext.fillText(ylabel, this.textXPosition + this.#textWidth / 2 + 5, this.yMax - 1.5 * this.#textHeight);
  }
  plot(plotContext, xArr, yArr, pDots = false, pLine = true) {
    let xpos = this.#xOrigin + xArr[0] / this.#xDisplayScale;
    let ypos = this.#yOrigin - yArr[0] / this.#yDisplayScale;
    //plotContext.strokeStyle = pColor;
    //plotContext.lineWidth = 1;
    plotContext.beginPath();
    plotContext.moveTo(xpos, ypos);
    plotContext.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
    for (var i = 1; i < xArr.length; i++) {
      xpos = this.#xOrigin + xArr[i] / this.#xDisplayScale;
      ypos = this.#yOrigin - yArr[i] / this.#yDisplayScale;
      if (pLine) {
        plotContext.lineTo(xpos, ypos);
      } else {
        plotContext.moveTo(xpos, ypos);
      }
      if (pDots) {
        plotContext.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
      }
    }
    plotContext.stroke();
  }
}
export { Graph };
