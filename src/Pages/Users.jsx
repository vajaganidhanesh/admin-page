import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../features/users/userSlience";
import UserDetails from "./UserDetails";

function Users() {
  const [edit,setEdit] = useState(false)
  const dispatch = useDispatch();
  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    dispatch(getUsers());

    // eslint-disable-next-line
  }, [message]);

  if (isLoading) {
    return <>loading...</>;
  }
  return (
    <>
      {
        edit === true?(
          <div className="editDetails"onClick={()=>{
            setEdit(false)
        }}>
          </div>
        ):null
      }
      
      {users?.map((users, index) => {
        return <UserDetails key={index} users={users} />;
      })}
    </>
  );
}

export default Users;
