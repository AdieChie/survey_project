var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');

// async function createNewTable(){
//   try {
//     let pool = await sql.connect(config);
      
//     var query = " create table Survey  (SurveyId varchar(8) PRIMARY KEY not null, Name varchar(255), UserId varchar(255) foreign key references Users(UserId))";
//     let products = await pool.request().query(query);
//     return products.recordsets
//   } catch (error) {
//     console.log(error);
//   }
// }
// createNewTable();



async function getAllSurveys() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Survey");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

 
async function getSurveyById(id) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.VarChar(10), id)
      .query("SELECT * FROM Survey WHERE SurveyId = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createSurvey(postSurvey) {
  try {
    let survey = await sql.connect(config);
    let insertSurvey = await survey
      .request()
      .input("SurveyId", sql.VarChar(8), postSurvey.SurveyId)
      .input("Name", sql.VarChar, postSurvey.Name)
      .input("UserId", sql.VarChar, postSurvey.UserId)
      .input("UserName", sql.VarChar, postSurvey.UserName)
      .query(
        "INSERT INTO Survey (SurveyId,Name,UserId,UserName) VALUES (@SurveyId,@Name,@UserId,@UserName)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      SurveyId: insertSurvey.parameters.SurveyId.value,
      Name: insertSurvey.parameters.Name.value,
      UserId: insertSurvey.parameters.UserId.value,
      UserName: insertSurvey.parameters.UserName.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteSurvey(id) {
  try {
    let survey = await sql.connect(config);
    let todo = await survey
      .request()
      .input("input_parameter", sql.VarChar(8), id)
      .query("DELETE FROM Survey WHERE SurveyId = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateSurvey(surveyUp) {
  try {
    let updatedTask = await sql.connect(config);
    let todos = await updatedTask
      .request()
      .input("SurveyId", sql.VarChar(8), surveyUp.SurveyId)
      .input("Name", sql.VarChar, surveyUp.Name)
      .input("UserId", sql.VarChar(8), surveyUp.UserId)
      .query(
        "UPDATE Survey SET Name=@Name, UserId=@UserId WHERE UserId = @UserId",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      SurveyId: todos.parameters.SurveyId.value,
      Name: todos.parameters.Name.value,     
      UserId: todos.parameters.UserId.value,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createSurvey,
  deleteSurvey,
  updateSurvey,
  getAllSurveys,
  getSurveyById,
};
