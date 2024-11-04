// Name: sketch.js
// URL : https://github.com/gavinlyonsrepo/LED_Segment_Display_Simulator.git
// Description: main file for program
// Language : P5 JavaScript 
// Written : Gavin Lyons 


let index = 0;
let ssd;
let type;
let autoScanCheckbox = undefined;
let filetext= [];

const asciiOffset = 32;

function preload()
{
	type = prompt("LED_Segment_Display_Simulator.\nWhat Segment type do you want? \nType 7 , 9 , 14, 16. ", "7");
	index = prompt("LED_Segment_Display_Simulator.\nWhat ASCII start point do you want? \nType enter for start point 0. ");
	if (index != "")
	{
		index = index.charCodeAt(0);
		index = index - asciiOffset;
	}else 
		index =0;
}


function setup() {
  // Canvas
  createCanvas(500, 350);
  frameRate(1);
  
  // Checkbox
  autoScanCheckbox = createCheckbox("Enable auto scan", false);
  
  // Segment display
  ssd = new SegmentDisplay(type);
  
}

function draw() {  
  background(0);
  DrawTitle(type); //Write  title
  DrawData();  //write data
  push();
  noStroke();
  noFill();
  ssd.displayDigit(index); // display segments
  ssd.update();
    if(autoScanCheckbox.checked())  {
		index = (index + 1) % ssd.SevenSegCodes.length;
   }
  pop();
}

function keyPressed() {
  if(autoScanCheckbox.checked() == false)
  {
	index = (index + 1) % ssd.SevenSegCodes.length;
  }
  return false; // prevent any default behaviour
}

function DrawData(){
	let xPos = 250;
	let yPos = 40;
	fill(180);
	textSize(20);
	text("Digit Hex Value:", xPos, yPos+25)
	switch (type){
		case '7': text("0x"+ hex(ssd.SevenSegCodes[index], 5), xPos, yPos+50); break;
		case '9': text("0x"+ hex(ssd.NineSegCodes[index], 5), xPos, yPos+50); break;
		case '14': text("0x"+ hex(ssd.FourteenSegCodes[index], 5), xPos, yPos+50); break;
		case '16': text("0x"+ hex(ssd.SixteenSegCodes[index], 5), xPos, yPos+50); break;
	}
	text("Digit Array Index:", xPos, yPos+75);
	text(index, xPos, yPos+100);
	text("Digit ASCII Character:", xPos, yPos+125);
	text(String.fromCharCode(index+asciiOffset), xPos, yPos+150);
	text("Digit ASCII Hex Code:", xPos, yPos+175);
	text("0x"+ hex(index+asciiOffset, 2), xPos, yPos+200);
	text("Digit ASCII Dec Code:", xPos, yPos+225);
	text(index+asciiOffset, xPos, yPos+250)
}

function DrawTitle(type) {
	fill(220);
	textSize(30);
	text(ssd.segmentsType +  " Segment LED Display", 65, 40);
}
