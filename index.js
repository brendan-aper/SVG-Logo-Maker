const fs = require('fs');
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }
  render(){
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
  }
  setTextElement(text,color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
  }
  setShapeElement(shape) {
    this.shapeElement = shape.render()
  } 
}

const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter up to three Characters:",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter a color keyword (OR a hexadecimal number) for the text color:",
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter a color keyword (OR a hexadecimal number) for the shape color:"
  },
  {
    type: "list",
    name: "shape",
    message: "Choose which shape you would like?",
    choices: ["Circle", "Square", "Triangle"]
  },
]

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Success')
  })
}

async function init() {
  var svgString = "";
  var svgFile = "logo.svg";

    const answers = await inquirer.prompt(questions);

  var userText = "";
  if (answers.text.length > 0 && answers.text.length < 4) {
    userText = answers.text;
  } else {
    console.log("Invalid input, Please enter up to 3 Characters");
      return;
  }

  userTextColor = answers.textColor;
  userShape = answers.shape;
  userShapeColor = answers.shapeColor;

  let newShape;
  if(userShape === "Circle") {
    newShape = new Circle();

  } else if (userShape === "Square") {
    newShape = new Square();

  } else if (userShape === "Triangle") {
    newShape = new Triangle();

  } else {
    console.log("Invalid Shape!")
  }
  newShape.setColor(userShapeColor);

  var svg = new Svg();
  svg.setTextElement(userText, userTextColor);
  svg.setShapeElement(newShape);
  svgString = svg.render();

  writeToFile(svgFile, svgString);
}

init()