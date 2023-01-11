onmessage = (e) => {
  const user = e.data;
  const data = {
    username: user.login.username,
    name: user.name.first + " " + user.name.last,
    age: user.dob.age,
    country: user.location.country,
  };

  postMessage(data);
};
