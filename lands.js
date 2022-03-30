const homebtn = document.querySelector('.hbtn');
const btn = document.querySelector('.Abtn');
const Cbtn = document.querySelector('.Cbtn');
const logbtn = document.querySelector('.tbtn');
const display1 = document.querySelector('#userdisplay');
const display2 = document.querySelector('.abt');
const display3 = document.querySelector('.digits');

if(btn!= null){
  btn.addEventListener('click', () => {
    display1.style.visibility = 'hidden';
    display2.style.visibility = 'visible';
    display3.style.visibility = 'hidden';
  })
}

if(Cbtn!=null){
  Cbtn.addEventListener('click', () => {
  display1.style.visibility = 'hidden';
  display2.style.visibility = 'hidden';
  display3.style.visibility = 'visible';
})}

if(homebtn!=null){
  homebtn.addEventListener('click', () => {
    display1.style.visibility = 'visible';
    display2.style.visibility = 'hidden';
    display3.style.visibility = 'hidden';
  })
}



var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
 if(modal!=null){
  logbtn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
 }
// When the user clicks the button, open the modal 


//populating table
const SurveyTable = document.querySelector('.myTable');
class UI {
  static displaySurveys() {
    surveyListArray.forEach(survey => UI.addBookToList(survey));
  }


  static addSurveyToList(survey) {
    const list = document.querySelector('#sur-list');
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${survey.Name}</td>
      <button class="${survey.SurveyId} survey">Take Survey</button>
    `;

   // console.log(survey.SurveyId);
    if (list != null) {
      list.appendChild(row);
    }
    // console.log(row);
  }

 

  static showQuestions(el) {
    if (el.classList.contains("Take Survey")) {
      //console.log("showQues")
      var id = el.classList[0];
      console.log(id);
     
      if (id.classList.contains('survey')) {
        myId = id.classList[0];
        sessionStorage.setItem('SurveyId', myId)
        console.log(myId)}
    }
  }

  
}

document.addEventListener('DOMContentLoaded', async () => {
  surveyListArray = await getAllSurveys();
  //console.log(surveyListArray);
  surveyListArray.forEach((survey) => {
    UI.addSurveyToList(survey)

  });

});



function showQuestions(question) {
  let myPage = document.querySelector('.sub-list')
  if (myPage != null) {
    console.log("im working")
    const row = document.createElement('ol');
    row.innerHTML = `
    <li>${question.QuestionText}</li>
    `
    myPage.appendChild(row)
  }

}
if (document.querySelector('#sur-list') != null) {
  document.querySelector('#sur-list').addEventListener('click', (e) => {

    print(e.target)
  });

  var myId;
  let dummyQuestions = [];

  async function print(id) {
    if (id.classList.contains('survey')) {
      myId = id.classList[0];
      sessionStorage.setItem('SurveyId',myId)
      let Questions = [];
    Questions = await getQuestionsData()

    console.log(Questions);
    let filArr = [];
    console.log('this is my id',myId)

    filArr = Questions.filter(question => question.SurveyId === myId)
    console.log(filArr);
    

    filArr.forEach(ques => {
      showQuestions(ques)
    dummyQuestions.push(ques);
    })

     location.href='answers.html'
    }

  }
}



