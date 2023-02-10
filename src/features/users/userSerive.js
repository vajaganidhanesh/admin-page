const API_URL = "https://blue-journalist-bbrpv.ineuron.app:4000/";

const getUsers = async () => {
  const response = await fetch(`${API_URL}users`);
  const data = await response.json();
  console.log(data.data);
  return data.data;
};

const addUser = async (userData) => {
  const response = await fetch(`${API_URL}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  console.log(data);
  return data.data;
};

const updateUser = async (userData) => {
  const { firstName, lastName, age, id, phoneNumber } = userData;
  const updatedata = {
    firstName,
    lastName,
    age,
    phoneNumber,
  };
  const response = await fetch(`${API_URL}user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedata),
  });
  const data = await response.json();
  console.log(data.data);

  return data.data;
};

const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}user/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
};

const userServices = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};

export default userServices;
