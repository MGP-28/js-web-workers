// The onmessage handler allows us to run some code whenever a message is received,
// with the message itself being available in the message event's data attribute
// then use postMessage() to post the result back to the main thread.
// In the main thread, use onmessage event to receive response from worker

// onmessage -> event to receive data. event as parameter
// event.data -> retrive data sent into the worker
// postMessage -> sent out processed data

onmessage = (e) => {
  console.log("Message received from main script");

  const timer = e.data.seconds * 1000;

  setTimeout(() => {
    const workerResult = `You waited ${e.data.seconds} seconds`;

    console.log("Posting message back to main script");
    postMessage(workerResult);
  }, timer);
};