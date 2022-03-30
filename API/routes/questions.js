var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");

// async function createNewTable(){
//   try {
//     let pool = await sql.connect(config);

//     var query = "CREATE TABLE Questions  (QuestionId VarChar(8) PRIMARY KEY, SurveyId VarChar(8) foreign key references Survey(SurveyId), QuestionText VarChar(255),QuestionType Int)";
//     let products = await pool.request().query(query);
//     return products.recordsets;
//   } catch (error) {
//     console.log(error);
//   }
// }
// createNewTable()

async function getAllQuestions() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Questions");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getQuestionById(id) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM Questions WHERE QuestionId = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createQuestion(postQuestion) {
  try {
    let question = await sql.connect(config);
    let insertQuestion = await question
      .request()
      .input("QuestionId", sql.VarChar(8), postQuestion.QuestionId)
      .input("SurveyId", sql.VarChar(8), postQuestion.SurveyId)
      .input("QuestionText", sql.VarChar(255), postQuestion.QuestionText)
      .input("QuestionType", sql.Int, postQuestion.QuestionType)    
      .query(
        "INSERT INTO Questions (QuestionId,SurveyId,QuestionText,QuestionType) VALUES (@QuestionId,@SurveyId,@QuestionText,@QuestionType)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      QuestionId: insertQuestion.parameters.QuestionId.value,
      SurveyId: insertQuestion.parameters.SurveyId.value,
      QuestionText: insertQuestion.parameters.QuestionText.value,
      QuestionType: insertQuestion.parameters.QuestionType.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteQuestion(id) {
  try {
    let user = await sql.connect(config);
    let userList = await user
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM Questions WHERE QuestionId = @input_parameter");
    return userList.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateQuestion(questionUp) {
  try {
    let updatedQuestion = await sql.connect(config);
    let question = await updatedQuestion
      .request()
      .input("QuestionId", sql.VarChar, questionUp.QuestionId)
      .input("SurveyId", sql.VarChar, questionUp.SurveyId)
      .input("QuestionText", sql.Text, questionUp.QuestionText)
      .query(
        "UPDATE Questions SET QuestionText=@QuestionText WHERE QuestionId = @QuestionId",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
        QuestionId: question.parameters.QuestionId.value,
        SurveyId:question.parameters.SurveyId.value,
        QuestionText: question.parameters.QuestionText.value,
     
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestions,
  getQuestionById,
};