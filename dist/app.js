const submitButton = document.getElementById("submitButton");
const inputfield = document.getElementById("userInput");


async function postData(){
  try {
    let endpoint = "http://127.0.0.1:1234/v1/chat/completions";

    const data  = {
      "model": "gemma-2-2b-it",
      "messages": messageList,
      "temperature": 0.7,
      "max_tokens": -1,
      "stream": false
    };

    const request = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const response = await request.json();
    console.log(response);
    return response;
  } catch (error){
    console.error("Error posting data:", error);
  }
}

async function handleResponse() {
  const reply = await postData(messageList);
  const repliedMessage = reply.choices[0].message.content;
  console.log(repliedMessage);
  document.getElementById("output").textContent = repliedMessage;
  messageList.push({ "role": "assistant", "content": repliedMessage });
}

const messageList = [
  { "role": "system", "content": "You are a wizard from mordor"},
];

function processNewMessage(){
  console.log("Processing message");
  const input = inputfield.value;
  inputfield.value = "";
  
  messageList.push({"role": "user", "content": input});
  handleResponse(messageList);
}

