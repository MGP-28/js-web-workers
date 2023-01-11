import { validator } from "./validator.js";

const timer = document.getElementById("timer");
const form = document.getElementById("form");
const amountInput = document.getElementById("amount-input");
const cards = document.getElementById("cards");

//
// Creating a new worker is simple. All you need to do is call the Worker() constructor, specifying the URI of a script to execute in the worker thread (main.js):

let worker = undefined;
setInterval(() => {
  const data = timer.textContent;
  worker = new Worker("worker.js");
  worker.postMessage(data);
  createResponseListenerTimer(worker);
}, 1000);

//
// The magic of workers happens via the postMessage() method and the onmessage event handler.
// When you want to send a message to the worker, you post messages to it like this (main.js):

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = amountInput.value;
  if (!validator(amount)) {
    window.alert("Invalid number");
    return;
  }

  const usersWorker = new Worker("users.js");
  usersWorker.postMessage(amount);
  createResponseListenerUsers(usersWorker);
});

//
// The onmessage handler allows us to run some code whenever a message is received, with the message itself being available in the message event's data attribute.
// Here we multiply together the two numbers then use postMessage() again, to post the result back to the main thread.
// Back in the main thread, we use onmessage again, to respond to the message sent back from the worker:

function createResponseListenerTimer(worker) {
  worker.onmessage = (e) => {
    timer.textContent = e.data;
    terminate(worker);
  };
}

function createResponseListenerUsers(worker) {
  worker.onmessage = (e) => {
    const users = e.data;

    users.forEach((user) => {
      const userWorker = new Worker("user.js");
      userWorker.postMessage(user);
      createResponseListenerUser(userWorker);
    });

    terminate(worker);
  };
}

function createResponseListenerUser(worker) {
  worker.onmessage = (e) => {
    const user = e.data;
    const userEl = document.createElement("div");
    userEl.classList.add("user-card");
    userEl.innerHTML = `
        <p>Username: <span>${user.username}</span></p>
        <p>Name: <span>${user.name}</span></p>
        <p>Age: <span>${user.age}</span></p>
        <p>Country: <span>${user.country}</span></p>
    `;
    cards.appendChild(userEl);
    terminate(worker);
  };
}

//
// If you need to immediately terminate a running worker from the main thread, you can do so by calling the worker's terminate method

function terminate(worker) {
  worker.terminate();
}

//
////
