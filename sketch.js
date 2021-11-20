let animating = false;

//display random questions from this array
let question_library = [
"What are one or two things you are thankful for this year?"
"What is your favorite thing about Thanksgiving?"
"What activities do you do during Thanksgiving?"
"How to say “thank you” in your language?"

"How often do you travel during Thanksgiving break?"
"What plans do you have for this break/next break?"

"Which places have you explored this year?"

"What are your favorite Thanksgiving foods?"
"What are your favorite Thanksgiving beverages?"
"What are your favorite Thanksgiving desserts?"

"How is the weather in your area?"
"What do you like about the autumn season?"

"Which movies have you watched recently?"
"What kinds of music have you been listening to recently?"
"What are your favorite music genres?"
"What musical instrument do you play?"
"What sports do you play/watch?"
"What are your favorite sports teams?"
];

let index = -1;
let state = 'title';
let questions = [];
let numQuestions = 0;

let nextButton; //button to display next question

function setup() {
  cnv=createCanvas(windowWidth, 450);
  cnv.parent("#canvasDiv");
  pixelDensity(1);
  nextButton = select("#nextQuestion");
  nextButton.mousePressed(buttonPressed);
}

function draw() {
   switch (state){
     case 'title':
        title();
        break;

     case 'play':
        showQuestion();
        break;

    default:
        break;
   }
}

function drawPixels() { //draw a vertical sunset-like background
  loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let index = (i + j * width) * 4;
      pixels[index + 0] = 255; //add bright red pixels to the top
      pixels[index + 1] = j*0.75;  //add green pixels to red ones to create yellow
      pixels[index + 2] = 0; //no blue used here
      pixels[index + 3] = 180; //added transparency to make colors lighter
    }
  }
  updatePixels();
}

function title() {
  if (questions.length == 0) {
    for (let i=0; i<question_library.length; i++) {
       questions.push(question_library[i]);
    }
  }

  drawPixels();
  fill(90, 0, 214); //bright purple text to contrast with red and yellow background
  textAlign(CENTER);
  textSize(60);
  text("Thanksgiving Ice Breaker", width*0.5, height*0.5);
  textSize(24);
  text("Click button to begin new round", width*0.5, height*0.75);
}

function showQuestion(){
  drawPixels();
  textAlign(CENTER);
  textSize(36);
  console.log(`question: index=${index}, length = ${questions.length}`);
  text(questions[index], width * 0.5, height * 0.5);
}

function buttonPressed(){
  console.log(`b4: index=${index}, length = ${questions.length}`);
  if (index >= 0){
    questions.splice(index, 1);
  }
  if (numQuestions >= 8){
    initTitle();
    console.log(`question_library=${question_library}`);
    return;
  }
  state = 'play';
  index = randomIndex = int(random(questions.length));
  numQuestions += 1;
  console.log(`after: index=${index}, length = ${questions.length}`);
}

function initTitle(){
  state = 'title';
  index = -1;
  numQuestions = 0;
}
