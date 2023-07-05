import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUsers, reset } from "../features/users/userSlience";
import UserDetails from "./UserDetails";

function Users() {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { users, isLoading, isSuccess } = useSelector((state) => state.users);
  useEffect(() => {
    if (isSuccess) {
      toast.success("users are fetched successfully");
    }
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <>loading...</>;
  }
  return (
    <>
      {edit === true ? (
        <div
          className="editDetails"
          onClick={() => {
            setEdit(false);
          }}
        ></div>
      ) : null}

      {users?.map((users, index) => {
        return <UserDetails key={index} users={users} />;
      })}
    </>
  );
}

export default Users;
