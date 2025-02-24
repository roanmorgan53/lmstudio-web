async function GetData() {
  const message = ["Introduce yourself"];
  let endpoint = "http://127.0.0.1:1234/v0/chat/completions";
  const request = await fetch(endpoint, {method: 'POST'});
  const response = await request.json();
  console.log(response);
}

async function postData(){
  try {
    let endpoint = "http://127.0.0.1:1234/v1/chat/completions";

    const postData  = {
      "model": "gemma-2-2b-it",
      "messages": [
        {"role": "user", "content": "Introduce yourself."}
      ],
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
      body: JSON.stringify(postData)
    });

    const response = await request.json();
    console.log(response);
    return response;
  } catch (error){
    console.error("Error posting data:", error);
  }
}

async function handleResponse() {
  const reply = await postData();
  const repliedMessage = reply.choices[0].message.content;
  console.log(repliedMessage);
  document.getElementById("output").textContent = repliedMessage;
}

handleResponse();
