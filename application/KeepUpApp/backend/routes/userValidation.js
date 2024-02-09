//This function is imported by user.routs to validate the email and password input by the user

export default function userVal(input) {
    var valmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    var valpwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; 
    if (input.email.match(valmail)) { 
        if (input.password.match(valpwd)) return input;
        return null;  
    } else {
      return null;  
    } 
}