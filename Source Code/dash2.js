
const body = document.querySelector('body'),
  sidebar = body.querySelector('nav'),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

if (toggle != null) {
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  })

  searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
  })

  modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      modeText.innerText = "Light mode";
    } else {
      modeText.innerText = "Dark mode";

    }
  });
}


let surveyListArray = [];
// const row = document.createElement('button');
if (document.querySelector('#sur-list') != null) {
  document.querySelector('#sur-list').addEventListener('click', (e) => {

    showmodal(e.target)
  });

  var Quemodal = document.getElementById("QModal");


var myId;

  function showmodal(id) {
    if (id.classList.contains('survey')) {
      myId = id.classList[0];
      console.log(myId)
      Quemodal.style.visibility = 'visible'
    }

  }

  function closeModal() {
    Quemodal.style.display = "none"
  }

}
var vhara = document.getElementById("cls");


if (vhara != null) {
  vhara.addEventListener('click', closeModal)
  const create = document.getElementById("creat");

  // ===============================================================================
  let surveyArr = [];
  var user = localStorage.getItem('userCredentials');
  var data = JSON.parse(user);
  create.addEventListener('click', async () => {
    var surveyName = document.querySelector('#input-survey');
    // var user = localStorage.getItem('userCredentials');
    // var data = JSON.parse(user);
    let newSurvey = {
      Name: surveyName.value,
      UserId: data.UserId,
      UserName: data.FirstName
    }

    //post survey
    surveyArr = await postSurveyData(newSurvey);
    console.log(surveyArr);
    surveyListArray.push(surveyArr);
    UI.addSurveyToList(newSurvey);
    document.querySelector('#input-survey').value = '';
  })

}

// ==============================================================
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
      <td>${survey.UserName}</td>
      <button class="${survey.SurveyId} survey">Create Questions</button>
    `;
    if (list != null) {
      list.appendChild(row);

    }


  }

  static showQuestions(el) {
    if (el.classList.contains("survey")) {
      var id = el.classList[0];
      console.log(id);
      sessionStorage.setItem('SurveyId', id)
    }
  }


}

document.addEventListener('DOMContentLoaded', async () => {
  surveyListArray = await getAllSurveys();
  //console.log(surveyListArray);
  surveyListArray.forEach((survey) => {
    UI.addSurveyToList(survey)


  });
  yValues.push(surveyListArray.length);
  document.querySelector('.total').append((surveyListArray.length));
  countResponses();




});
var yValues = [];
// =============================================================================
let queArry = [];
let queustionsArry = [];
// let 
var saveQuestions = document.querySelector('.saveQuestion');
if (saveQuestions != null) {
  saveQuestions.addEventListener('click', async () => {
    var question = document.querySelector('.surQue');
    var type;
    if (document.querySelector('#type').value === 'Input-field') {
      type = 0;
    }
    else if (document.querySelector('#type').value === 'Yes/No') {
      type = 1;
    }
    else if (document.querySelector('#type').value === 'Range') {
      type = 2;
    };

    // var SurId = surveyArr.SurveyId;

    let newQuestion = {
      SurveyId: myId,
      QuestionText: question.value,
      QuestionType: type
    }
    queArry = await postQuestionData(newQuestion);
    queustionsArry.push(queArry);
    question.value='';
  })
  
}

// =======================================================
let span = document.querySelector('.name');
span.append(data.FirstName);
// =============================================================================

const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})

// document.querySelector('#log').addEventListener('click',()=>{
//   console.log("logging out")
//   document.querySelector('#myModal').visibility= "visible";
// })
// ============================================================
if (document.querySelector('.questions-container')) {
  document.querySelector('.questions-container').addEventListener('click', (e) => {
    e.preventDefault();
    showSurveys.showQuestions(e.target);

  })
}

// ==============================================================================
const questionContainer = document.querySelector(".questions-container");

let questions = [];
let filteredQuestions = [];
let dummyQuestions = [];
var finish = document.querySelector('.Finish');
if (finish != null) {
  finish.addEventListener('click', async () => {

    let Questions = [];
    Questions = await getQuestionsData()

    console.log(Questions);
    let filArr = [];

    filArr = Questions.filter(question => question.SurveyId === myId)
    console.log(filArr);
    filArr.forEach(ques => showQuestions(ques))
    const ListModal = document.querySelector('.ListModal')
    Quemodal.style.visibility = 'hidden'
    ListModal.style.visibility = 'visible'
    const Done = document.querySelector('.Done');
    Done.addEventListener('click', () => {
      ListModal.style.visibility = 'hidden';
    })
    //setTimeout(location.href = 'empty.html', 2000) ;
  })
}

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
var y;
async function countResponses() {
  let responseArry = [];
  responseArry = await getResponseData();
  // console.log(responseArry);
  document.querySelector('.totalResponses').append(responseArry.length);
  yValues.push(responseArry.length);

}
// ----------------------------------------------------------------
// console.log(yValues)
var xValues = ["Total Responses", "Total Surveys"];
// var yValues = [];
var barColors = ["blue", "orange"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 5,
        }
      }],
      xAxes: [{
        BarThickness: 6,
      }],

    },
    legend: { display: false },
    title: {
      display: true,
      text: "Survey Response"
    }
  }
});

const yes = document.querySelector('.yes')
yes.addEventListener('click', () => {
  location.href = "slide.html"
})

const no = document.querySelector('.No')
no.addEventListener('click', () => {

})


  // -------------------------------------------------------------------------------
 