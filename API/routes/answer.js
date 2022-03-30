class Answer {
    constructor(AnswerId,ResponseId, QuestionId, UserId,SurveyId,Answer) {
      this.AnswerId = AnswerId;
      this.ResponseId = ResponseId;
      this.QuestionId = QuestionId;
      this.UserId = UserId;
      this.SurveyId=SurveyId;
      this.Answer= Answer;
    }
  }
  
  module.exports = Answer;
  