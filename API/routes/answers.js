var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");



// async function createNewTable(){
//   try {
//     let pool = await sql.connect(config);
      
//     var query = " create table Answers  (AnswerId varchar(9) PRIMARY KEY not null, ResponseId varchar(8) foreign key references SurveyResponses(ResponseId), QuestionId varchar(8) foreign key references Questions(QuestionId),Answer varchar(255))";
//     let products = await pool.request().query(query);
//     return products.recordsets
//   } catch (error) {
//     console.log(error);
//   }
// }
// createNewTable();


async function getAllAnswers() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Answers");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getAnswerById(id) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM Answers WHERE AnswerId = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createAnswer(postAnswer) {
  try {
    let answer = await sql.connect(config);
    let insertAnswer = await answer
      .request()
      .input("AnswerId", sql.VarChar, postAnswer.AnswerId)
      .input("ResponseId", sql.VarChar, postAnswer.ResponseId)
      .input("QuestionId", sql.VarChar, postAnswer.QuestionId)
      .input("Answer", sql.VarChar, postAnswer.Answer)   
      .query(
        "INSERT INTO Answers (AnswerId,ResponseId,QuestionId,Answer) VALUES (@AnswerId,@ResponseId,@QuestionId,@Answer)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      AnswerId: insertAnswer.parameters.AnswerId.value,
      ResponseId: insertAnswer.parameters.ResponseId.value,
      QuestionId: insertAnswer.parameters.QuestionId.value,
      Answer: insertAnswer.parameters.Answer.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteAnswer(id) {
  try {
    let user = await sql.connect(config);
    let userList = await user
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM Answers WHERE AnswerId = @input_parameter");
    return userList.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateAnswer(postAnswer) {
  try {
    let updatedUser = await sql.connect(config);
    let insertAnswer = await updatedUser
      .request()
      .input("ResponseId", sql.VarChar, postAnswer.ResponseId)
      .input("QuestionId", sql.VarChar, postAnswer.QuestionId)
      .input("Answer",sql.VarChar,postAnswer.Answer)
      .query(
        "UPDATE Answers SET Answer=@Answer WHERE AnswerId = @AnswerId",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
        AnswerId: insertAnswer.parameters.AnswerId.value,
        ResponseId: insertAnswer.parameters.ResponseId.value,
        QuestionId: insertAnswer.parameters.QuestionId.value,
        Answer: insertAnswer.parameters.Answer.value,
     
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createAnswer,
  deleteAnswer,
  updateAnswer,
  getAllAnswers,
  getAnswerById,
};