const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});

// =========================================================

const logForm = document.getElementById("login-form");
if(logForm){
  logForm.addEventListener('submit', async(e)=>{
    e.preventDefault();

    let userDetails = {
      Email: document.querySelector('#login-email').value,
      Password: document.querySelector('#login-pwd').value
    }
    // let logins=[];
    // logins=await postDataUser(userDetails);
    let results = await postDataUser(userDetails);
    if(results==false){
      alert('Incorrect credentials');
    }else{
      let response = await postDataUser(userDetails);
      var json = JSON.stringify(response);
           localStorage.setItem('userCredentials', json)
           var user = localStorage.getItem('userCredentials')
           var data =JSON.parse(user);
           if(data.UserType == 1){
            location.href='dash2.html';
           }else if(data.UserType==2){
             location.href = 'landingpage.html';
           }
            
            
      
  }
    
  })
  
}
Email='';
Password='';
// ====================================================================


// ================================================================
const signUp = document.querySelector('.signup-form');
if(signUp){
  signUp.addEventListener('submit',async(e)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log("working")
    let userInfo = {
      Email: document.querySelector('#registrationEmail').value,
      FirstName: document.querySelector('#registrationName').value,
      LastName: document.querySelector('#registrationSurname').value,
      UserType: 2,
      Password: document.querySelector('#RegPwd').value
    }
    
if(document.querySelector('#RegPwd').value === document.querySelector('#cRegPwd').value){
let signUps = [];
signUps = await postUserData(userInfo);
setTimeout(location.href = 'slide.html', 2000);
console.log(signUps);
}else{
  alert('passwords do not match');
}
   }) 
 }

 Email='';
 FirstName = '';
 LastName = '';
 UserType = '';
 Password = '';
 document.querySelector('#cRegPwd').value='';


