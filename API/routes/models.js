class Survey {
    constructor(SurveyId, Name, UserId, UserName){
        this.SurveyId = SurveyId;
        this.Name = Name;
        this.UserId = UserId;
        this.UserName = UserName;
    }
}

class Users {
    constructor(UserId, Name, Email, Password, UserType){
        this.UserId = UserId;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.UserType = UserType;
    }
}

// class Question {
//     constructor(QuestionId, SurveyId, QuestionText){
//         this.QuestionId = QuestionId;
//         this.SurveyId = SurveyId;
//         this.QuestionText = QuestionText;
//     }
// }

class SurveyResponse{
    constructor(ResponseId, SurveyId,UserId)
    {
        this.ResponseId = ResponseId;
        this.SurveyId = SurveyId;
        this.UserId = UserId;
    }

}

class SurveyResponseAnswer{
    constructor(AnswerId, ResponseId, QuestionId,Answer)
    {
        this.AnswerId = AnswerId;
        this.ResponseId = ResponseId;
        this.QuestionId = QuestionId;
        this.Answer = Answer;
    }

}

module.exports = {
    Survey,
    Users,
    Question,
    SurveyResponse,
    SurveyResponseAnswer,
}