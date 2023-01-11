const output = document.getElementById("output");
const form = document.getElementById("form");
const amountInput = document.getElementById("amount-input");

//
// Creating a new worker is simple. All you need to do is call the Worker() constructor, specifying the URI of a script to execute in the worker thread (main.js):

const myWorker = new Worker("worker.js");

//
// The magic of workers happens via the postMessage() method and the onmessage event handler.
// When you want to send a message to the worker, you post messages to it like this (main.js):

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = { seconds: amountInput.value };
  myWorker.postMessage(data);
});

//
// The onmessage handler allows us to run some code whenever a message is received, with the message itself being available in the message event's data attribute.
// Here we multiply together the two numbers then use postMessage() again, to post the result back to the main thread.
// Back in the main thread, we use onmessage again, to respond to the message sent back from the worker:

myWorker.onmessage = (e) => {
  output.textContent = e.data;
  console.log("Message received from worker");
  terminate();
};

//
// If you need to immediately terminate a running worker from the main thread, you can do so by calling the worker's terminate method

function terminate() {
  myWorker.terminate();
}
