// Name: sketch.js
// URL : https://github.com/gavinlyonsrepo/LED_Segment_Display_Simulator.git
// Description: main file for program
// Language : P5 JavaScript
// Written : Gavin Lyons


let index = 0;
let ssd7;
let ssd9;
let ssd14;
let ssd16;
let filetext= [];
let SegmentNumberTypes = ['7', '9', '14', '16'];
const asciiOffset = 32;

function preload()
{
	index = prompt("LED_Segment_Display_Simulator.\nWhat ASCII start point do you want? \nType enter for start point :: 'space' , index = 0 ,  ASCII = 32. ");
	if (index != "")
	{
		index = index.charCodeAt(0);
		index = index - asciiOffset;
	}else {
		index = 0;
	}
}


function setup() {
	// Canvas
	createCanvas(1100, 800);
	frameRate(1);
	 // Checkbox
	autoScanCheckbox = createCheckbox("Enable auto scan", false);
	autoScanCheckbox.position(1120, 100);
	// Segment display
	ssd7 = new SegmentDisplay('7');
	ssd9 = new SegmentDisplay('9');
	ssd14 = new SegmentDisplay('14');
	ssd16 = new SegmentDisplay('16');
}

function draw() {
	background(0);
	for(let x =0 ; x<SegmentNumberTypes.length ; x += 1)
	{
		DrawTitle(SegmentNumberTypes[x]); //Write  title
		DrawData(SegmentNumberTypes[x]);  //write data
	}

	noStroke();
	noFill();

	push();
	ssd7.displayDigit(index); // display segments 7
	ssd7.update();
	pop();

	push();
	ssd9.displayDigit(index); // display segments 9
	ssd9.update();
	pop();

	push();
	ssd14.displayDigit(index); // display segments 14
	ssd14.update();
	pop();

	push();
	ssd16.displayDigit(index); // display segments 16
	ssd16.update();
	pop();
	
	if(autoScanCheckbox.checked())  
	{
		index = (index + 1) % ssd7.SevenSegCodes.length;
	}
	 

}

function keyPressed() {
	if(autoScanCheckbox.checked() == false)
	{
		index = (index + 1) % ssd7.SevenSegCodes.length;
	}
	return false; // prevent any default behaviour
}

function DrawData(type){
	let xPos = 250;
	let yPos = 40;
	fill(180);
	textSize(20);

	switch (type){
		case '7':
				xPos = 250;
				yPos = 40;
				text("0x"+ hex(ssd7.SevenSegCodes[index], 5), xPos, yPos+50);
		break;
		case '9':
				xPos = 800
				yPos = 40;
				text("0x"+ hex(ssd9.NineSegCodes[index], 5), xPos, yPos+50);
		break;
		case '14':
				xPos = 250;
				yPos = 350;
				text("0x"+ hex(ssd14.FourteenSegCodes[index], 5), xPos, yPos+50);
		break;
		case '16':
				xPos = 800;
				yPos = 350;
				text("0x"+ hex(ssd16.SixteenSegCodes[index], 5), xPos, yPos+50);
		break;
	}
	text("Digit Hex Value:", xPos, yPos+25)
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
	let xPos = 65;
	let yPos = 40;
	switch (type)
	{
		case '7': text(type +  " Segment LED Display", xPos, yPos);break;
		case '9': text(type +  " Segment LED Display", xPos+500, yPos);break;
		case '14': text(type +  " Segment LED Display", xPos, yPos+300);break;
		case '16': text(type +  " Segment LED Display", xPos+500,yPos+300);break;
	}
}
