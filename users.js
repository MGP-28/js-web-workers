onmessage = async (e) => {
  const url = `https://randomuser.me/api/?results=${e.data}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .then((users) => postMessage(users));
};
