var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");

// async function createNewTable(){
//   try {
//     let pool = await sql.connect(config);

//     var query = "CREATE TABLE SurveyResponses  (ResponseId VarChar(8) primary key not null, SurveyId VarChar(8)foreign key references Survey(SurveyId), UserId VarChar(255) foreign key references Users(UserId))";
//     let products = await pool.request().query(query);
//     return products.recordsets;
//   } catch (error) {
//     console.log(error);
//   }
// }
// createNewTable()

async function getAllResponses() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM SurveyResponses");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getResponseById(id) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM SurveyResponses WHERE ResponseId = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createResponse(postQuestion) {
  try {
    let question = await sql.connect(config);
    let insertQuestion = await question
      .request()
      .input("ResponseId", sql.VarChar, postQuestion.ResponseId)
      .input("SurveyId", sql.VarChar, postQuestion.SurveyId)
      .input("UserId", sql.VarChar, postQuestion.UserId)   
      .query(
        "INSERT INTO SurveyResponses (ResponseId,SurveyId,UserId) VALUES (@ResponseId,@SurveyId,@UserId)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      ResponseId: insertQuestion.parameters.ResponseId.value,
      SurveyId: insertQuestion.parameters.SurveyId.value,
      UserId: insertQuestion.parameters.UserId.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteResponse(id) {
  try {
    let user = await sql.connect(config);
    let userList = await user
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM SurveyResponse WHERE ResponseId = @input_parameter");
    return userList.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateResponse(questionUp) {
  try {
    let updatedUser = await sql.connect(config);
    let users = await updatedUser
      .request()
      .input("ResponseId", sql.VarChar, postQuestion.ResponseId)
      .input("SurveyId", sql.VarChar, postQuestion.SurveyId)
      .input("UserId", sql.VarChar, postQuestion.UserId)  
      .query(
        "UPDATE SurveyResponse SET UserId=@UserId WHERE ResponseId = @ResponseId",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      ResponseId: insertQuestion.parameters.ResponseId.value,
      SurveyId: insertQuestion.parameters.SurveyId.value,
      UserId: insertQuestion.parameters.UserId.value,
     
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createResponse,
  deleteResponse,
  updateResponse,
  getAllResponses,
  getResponseById,
};