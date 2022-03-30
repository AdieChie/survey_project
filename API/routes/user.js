class User {
    constructor(Id, Email, FirstName, LastName, UserType, Password) {
      this.Id = Id;
      this.Email = Email;
      this.FirstName = FirstName;
      this.LastName = LastName;
      this.UserType = UserType;
      this.Password = Password;
    }
  }
  
  module.exports = User;
  