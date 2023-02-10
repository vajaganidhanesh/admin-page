import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser as deleteParticular,updateUser } from "../features/users/userSlience";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useEffect } from "react";

const customStyles = {
  content: {
    width: "350px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function UserDetails({ users }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { firstName, lastName, phoneNumber, age, _id } = users;
  const [editData, setEditData] = useState({});

  const dispatch = useDispatch();
  const {
    users: userdata,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.users);

  useEffect(() => {
    if (isError === false) {
      toast.success(message);
    }
    // eslint-disable-next-line
  }, [isLoading]);

  function closeModal() {
    setIsOpen(false);
  }

  const editUser = (e) => {
    e.preventDefault();
    setEditData(users);
    setIsOpen(true);
  };

  const deleteUser = (e, id) => {
    e.preventDefault();
    dispatch(deleteParticular(id));
  };

  const onChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

};

const onSubmit = (e) => {
    e.preventDefault();
    
    const updateData = {
      firstName:editData.firstName,
      lastName:editData.lastName,
      age:editData.age,
      phoneNumber:editData.phoneNumber,
      id:editData._id
    }
    const id = editData._id
    console.log(id);
    
    dispatch(updateUser(updateData))
    setIsOpen(false)
    console.log(id);
};

  if (isLoading) {
    return <>its Loading...</>;
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <form onSubmit={onSubmit} className='addContainer editContainer'>
              <input
                type='text'
                className='emailInput'
                placeholder='FirstName'
                id='firstName'
                defaultValue={firstName}
                onChange={onChange}
              />

              <input
                type='text'
                className='passwordInput'
                placeholder='lastName'
                id='lastName'
                defaultValue={lastName}
                onChange={onChange}
              />

              <input
                type='text'
                className='emailInput'
                placeholder='Enter age'
                id='age'
                defaultValue={age}
                onChange={onChange}
              />

              <input
                type='text'
                className='emailInput'
                placeholder='Enter Mobile Number'
                id='phoneNumber'
                defaultValue={phoneNumber}
                onChange={onChange}
              />

              <div className='signInBar'>
                <button className='signInButton'>submit</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className='container'>
        <div className='usersDetails'>
          <ul className='detailsContainer'>
            <li className='userData'>
              <span>{firstName}</span>
            </li>
            <li className='userData'>
              <span>{lastName}</span>
            </li>
            <li className='userData'>
              <span>{age}</span>
            </li>
            <li className='userData'>
              <span>{phoneNumber}</span>
            </li>
            {/* <li className='userData'>
                <span>{new Date(updatedAt).toLocaleString("en-IN")}</span>
                </li> */}

            <li>
              <button
                type='button'
                onClick={(e) => {
                  editUser(e,_id);
                }}
              >
                edit
              </button>
            </li>

            <li>
              <button
                type='button'
                onClick={(e) => {
                  deleteUser(e, _id);
                }}
              >
                delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

UserDetails.propTypes = {
  users: PropTypes.object.isRequired,
};

export default UserDetails;
