// testikng
const questionTypes = Object.freeze({
  input: 0,
 // textArea: 1,
  range: 2,
  yesNo: 1,
  radioGroup: 4,
  multiCheckBox: 5,
  dropdown: 6,
});
const yes = 1;
const no = 0;

var dummyQuestions = [];
const questionContainer = document.querySelector(".questions-container");
let questions = [];
let filteredQuestions =[];
document.addEventListener('DOMContentLoaded', async()=>{

 // console.log(sessionStorage.getItem('SurveyId'))
  questions = await getQuestionsData();
 // console.log(questions)
  filteredQuestions = questions.filter(question=>question.SurveyId === sessionStorage.getItem('SurveyId'))
 // console.log(filteredQuestions);
  dummyQuestions=filteredQuestions.map(record=>({
         question: record.QuestionText,
         type: record.QuestionType,
         questionId:record.QuestionId,
        //  options: [
        //   // {
        //   //   text: record.possibleA,
        //   //   value: 1,
        //   // },
        //   // {
        //   //   text: record.possibleB,
        //   //   value: 2,
        //   // },
        //   // {
        //   //   text:record.possibleC,
        //   //   value: 3,
        //   // },
        // ],
  })
  )


let questionViews = "";




dummyQuestions.forEach(({ question, questionId, type, options }, index) => {
questionViews += questionsGenerator(question, type, questionId, index + 1, options);
});
questionContainer.innerHTML = questionViews;

})


function questionsGenerator(question, type, questionId, questionNumber, options = []) {
  switch (type) {
    case questionTypes.input:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        `<input id=${questionId} placeholder=' e.g javascript' class='standard-input' />` +
        "</div>" +
        "</div>"
      );
    case questionTypes.yesNo:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer-yes-no'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        "<div class='yes-no'>" +
        `<input type="radio" id=${questionId} name=${questionId} value="{1}" />` +
        "<label for='yes'>Yes</label>" +
        "<br />" +
        `<input type="radio" id=${questionId}  name=${questionId} value="{0}" />` +
        "<label for='no'>No</label>" +
        "<br/>" +
        "</div>" +
        "</div>" +
        "</div>"
      );
    case questionTypes.range:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        `<input id=${questionId} class="standard-input" type="range" min="0" max="10" />` +
        "</div>" +
        "</div>"
      );
    case questionTypes.textArea:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer-textAreaField'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        `<textarea id=${questionId} class="textAreaField" rows="4" cols="45">` +
        "" +
        "</textarea>" +
        "</div>" +
        "</div>"
      );
    case questionTypes.radioGroup:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer-checkRadio'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        " <div class='radioQuestions'>" +
        radioOptionCreator(questionId, options) +
        "</div>" +
        "</div>" +
        "</div>"
      );

    case questionTypes.multiCheckBox:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer-checkRadio'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        " <div class='radioQuestions'>" +
        checkOptionCreator(questionId, options) +
        "</div>" +
        "</div>" +
        "</div>"
      );
    default:
      return null;
  
  }
}

let questionViews = "";

dummyQuestions.forEach(({ question, questionId, type, options }, index) => {
  questionViews += questionsGenerator(question, type, questionId, index + 1, options);
});
questionContainer.innerHTML = questionViews;

function radioOptionCreator(questionId, options) {
  let initiaOptions = "";
  options.forEach(({ text, value }) => {
    initiaOptions +=
      `<input type="radio" id=${questionId} name=${questionId} value=${value} />` + `<label>${text}</label><br />`;
  }) + "</div>";
  return initiaOptions;
}

function checkOptionCreator(questionId, options) {
  let initiaOptions = "";
  options.forEach(({ text, value }) => {
    initiaOptions +=
      `<input type="checkbox" id=${questionId} name=${questionId} value=${value} />` + `<label>${text}</label><br />`;
  }) + "</div>";
  return initiaOptions;
}