var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");
var passwordHash = require('password-hash');
const { json } = require("body-parser");

//queryDatabase();

// async function createNewTable() {
//   try {
//     let pool = await sql.connect(config);

//     var query =
//       "CREATE TABLE Users  (UserId VarChar(255) PRIMARY KEY, Email VarChar(255), FirstName VarChar(255),LastName VarChar(255), UserType Int,Password VarChar(255))";
//     let products = await pool.request().query(query);
//     return products.recordsets;
//   } catch (error) {
//     console.log(error);
//   }
// }
//  createNewTable();
async function getAllUsers() {
  try {
    let pool = await sql.connect(config);
    let records = await pool.request().query("SELECT * FROM Users");
    return records.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(id) {
  try {
    let user = await sql.connect(config);
    let record = await user
      .request()
      .input("input_parameter", sql.NVarChar(255), id)
      .query("SELECT * FROM Users WHERE Id = @input_parameter");
    return record.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function validateUniqueUser(email) {
  try {
    let user = await sql.connect(config);

    let userfound = await user
      .request()
      .input("user_email", sql.VarChar(255), email)
      .query("SELECT * FROM Users WHERE Email = @user_email");

    return userfound.recordset.length;
  } catch (error) {
    console.log(error);
  }
}

// --------------------------------------------------
async function login(userDetails) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.VarChar, userDetails.Email)
      .query("SELECT * FROM Users WHERE Email = @input_parameter");

    console.log('found user', todo.recordsets)
    let emailExists = todo.recordsets[0].length;
    console.log(emailExists);
    let userFound = todo.recordsets[0][0];

    

    if (emailExists) {
      let validate = await unhashPassword(userDetails.Password, userFound.Password);
      console.log('password', userDetails.Password, userFound.Password)
      console.log('validated', validate)
      if (validate) {
        return todo.recordsets[0][0];
      } else {
        return false;
      }

    } else {
      return false;
    }

  } catch (error) {
    console.log(error);
  }
}
// --------------------------------------------------
async function signUp(user) {
  try {
    let newUser = await sql.connect(config);

    let insertTask = await newUser
      .request()
      .input("Id", sql.VarChar(255), user.Id)
      .input("Email", sql.VarChar(255), user.Email)
      .input("FirstName", sql.VarChar(255), user.FirstName)
      .input("LastName", sql.VarChar(255), user.LastName)
      .input("UserType", sql.VarChar, user.UserType)
      .input("Password", sql.VarChar(255), user.Password)
      .query(
        "INSERT INTO Users (UserId,Email,FirstName,LastName,UserType,Password) VALUES (@Id,@Email,@FirstName,@LastName,@UserType,@Password)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: insertTask.parameters.Id.value,
      Email: insertTask.parameters.Email.value,
      FirstName: insertTask.parameters.FirstName.value,
      LastName: insertTask.parameters.LastName.value,
      UserType: insertTask.parameters.UserType.value,
      Password: insertTask.parameters.Password.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(id) {
  try {
    let user = await sql.connect(config);
    let record = await user
      .request()
      .input("input_parameter", sql.NVarChar(255), id)
      .query("DELETE FROM Users WHERE Id = @input_parameter");
    return record.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateUser(user) {
  try {
    let updatedUser = await sql.connect(config);
    let record = await updatedUser
      .request()
      .input("Id", sql.VarChar(255), user.Id)
      .input("Email", sql.VarChar(255), user.Email)
      .input("FirstName", sql.VarChar(255), user.FirstName)
      .input("LastName", sql.VarChar(255), user.LastName)
      .input("UserType", sql.VarChar(255), user.UserType)
      .input("Password", sql.VarChar(255), user.Password)
      .query(
        "UPDATE Users SET Email=@Email,FirstName=@FirstName,LastName=@LastName,UserType=@UserType,Password=@Password WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: record.parameters.Id.value,
      Email: record.parameters.Email.value,
      FirstName: record.parameters.FirstName.value,
      LastName: record.parameters.LastName.value,
      UserType: record.parameters.UserType.value,
      Password: record.parameters.Password.value,
    };
  } catch (error) {
    console.log(error);
  }
}

function unhashPassword(entered, hashed) {
  return (passwordHash.verify(entered, hashed))
}

module.exports = {
  updateUser,
  deleteUser,
  login,
  signUp,
  getUserById,
  getAllUsers,
  validateUniqueUser,
};
