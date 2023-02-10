import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, reset } from "../features/users/userSlience";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function AddUserDetails() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
  });

  const { firstName, lastName, age, phoneNumber } = formData;

  const { isLoading, isError } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(reset());
    // eslint-disable-next-line
  }, [isError, isLoading, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      firstName.trim().length <= 3 &&
      lastName.trim().length <= 3 &&
      age.trim().length <= 2 &&
      phoneNumber.trim().length <= 10
    ) {
      console.log("error");
      toast.error("please enter details");
    } else {
      const userData = {
        firstName,
        lastName,
        age,
        phoneNumber,
      };

      dispatch(addUser(userData));
      dispatch(reset())
    }
  };

  return (
    <>
      <div className='addContainer'>
  
        <form onSubmit={onSubmit} className='addContainer'>
          
          <input
            type='text'
            className='emailInput'
            placeholder='FirstName'
            id='firstName'
            value={firstName}
            onChange={onChange}
          />
          
          <input
            type='text'
            className='passwordInput'
            placeholder='lastName'
            id='lastName'
            value={lastName}
            onChange={onChange}
          />

          <input
            type='text'
            className='emailInput'
            placeholder='Enter age'
            id='age'
            value={age}
            onChange={onChange}
          />

          <input
            type='text'
            className='emailInput'
            placeholder='Enter Mobile Number'
            id='phoneNumber'
            value={phoneNumber}
            onChange={onChange}
          />

          <div className='signInBar'>
            <button className='signInButton'>submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddUserDetails;
