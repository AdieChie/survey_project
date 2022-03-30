let questionsAnswers = [];
var responseObj;
let submitButton = document.querySelector(".submitting-answers");

submitButton.addEventListener("click", receivedAnswers);
//console.log(dummyQuestions);
function receivedAnswers() {
  dummyQuestions.forEach(({ questionId, type }) => {
    if (type == questionTypes.yesNo || type == questionTypes.radioGroup) {
      let answers = document.querySelectorAll(`[id='${questionId}']`);

      questionsAnswers.push({
        questionId: questionId,
       answer: [...answers].find((elmnt) => elmnt.checked == true).value,
      });
      return;
    } else if (type == questionTypes.multiCheckBox) {
      let answers = [...document.querySelectorAll(`[id='${questionId}']`)];

      answers = answers.filter((elmnt) => elmnt.checked).map((elnt) => elnt.value);

      questionsAnswers.push({
        questionId: questionId,
        answer: answers,
      });
      return;
    }

    questionsAnswers.push({
      questionId: questionId,
      answer: document.querySelector(`[id='${questionId}']`).value,
    });
  });
   console.log("checking....", questionsAnswers);
  SubmitResponse();
  location.href ="landingpage.html"
}

async function SubmitResponse(){
  let surveyid = sessionStorage.getItem('SurveyId');
    var user = localStorage.getItem('userCredentials')
    var data =JSON.parse(user);
    let Response = {
      SurveyId:surveyid,
      UserId: data.UserId,
    }

    responseObj = await postResponseData(Response);
    // console.log(responseObj.ResponseId)
    getAnswers();
    
    
}



async function SubmitAnswers(answers){
let answer = []
answer = await postAnswerData(answers)
console.log(answer)
// await Swal.fire(
//   '',
//   'Successful, Thank you for taking the survey',
//   'success'
// )
//location.href = 'landingpage.html'
// console.log(answer)
}
function getAnswers(){
  // let surveyid = sessionStorage.getItem('SurveyId');
  let response = responseObj.ResponseId;
  let myArr = [];
  let Answers;
  //console.log(response)

  questionsAnswers.forEach(answers=>{
   
      Answers = {
        ResponseId: response,
        QuestionId: answers.questionId,
        Answer: answers.answer,
        
        
      }
    //  AnswersObj ={
    //    ResponseId: Answers.ResponseId,
    //    QuestionId: Answers.QuestionId,
    //    possibleA: Answers.possibleA,
    //    possibleB: '',
    //    possibleC: '',
    //    possibleD: '',
    //  }
     console.log(Answers)
   //console.log(AnswersObj)
    

     SubmitAnswers(Answers);
    
      // console.log(`${response}:  ${ans}:      ${answers[ans
   
  })
 

  
}