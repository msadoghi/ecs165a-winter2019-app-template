import { db } from '../config/db';
//store user data
export const addUser =  (user) => {
    db.ref().child('users').push(user);
}
//get username
export const getUser =  (email) => {
    console.log(email)
   var data=db.ref().child('users').orderByChild("email")
   .equalTo(email);
  return data;    
}