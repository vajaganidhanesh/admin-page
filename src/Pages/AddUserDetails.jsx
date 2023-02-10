import React, { useState,useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {addUser,reset} from '../features/users/userSlience'
import { toast } from "react-toastify";

function AddUserDetails() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
  });

  const { firstName, lastName, age, phoneNumber} = formData;

  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch()


  useEffect(()=>{

    if(isSuccess){
      toast.error(message)
    }

    dispatch(reset())
    // eslint-disable-next-line
  },[isError,isLoading,dispatch])
  
  
  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  };

  const onSubmit = (e)=>{
    e.preventDefault();
    if(firstName === undefined){
      console.log(firstName)
      toast.error('please fill the form')
    }
    else{
      const userData = {
        firstName,
        lastName,
        age,
        phoneNumber
      }
  
      dispatch(addUser(userData))
    }

    
  }

  return (
  <>
    <div >
      <form onSubmit={onSubmit} className="addContainer">
            <input
              type="text"
              className="emailInput"
              placeholder="FirstName"
              id="firstName"
              value={firstName}
              onChange={onChange}
            />

            
              <input
                type="text"
                className="passwordInput"
                placeholder="lastName"
                id="lastName"
                value={lastName}
                onChange={onChange}
              />
           

            <input
              type="text"
              className="emailInput"
              placeholder="Enter age"
              id="age"
              value={age}
              onChange={onChange}
            />


            <input
              type="text"
              className="emailInput"
              placeholder="Enter Mobile Number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
            />

            <div className="signInBar">
              <button  className="signInButton">
               submit
              </button>
            </div>
      </form>
    </div>
  </>
  );
}

export default AddUserDetails;
