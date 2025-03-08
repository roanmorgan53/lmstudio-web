const submitButton = document.getElementById("submitButton");
const inputField = document.getElementById("userInput");
const chatContainer = document.getElementById("output");

const messageList = [
    { "role": "system", "content": "help me learn modern app development and full stack based on the T3 stack" },
];

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = isUser ? content : marked.parse(content);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.innerHTML = '<span></span><span></span><span></span>';
    chatContainer.appendChild(indicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return indicator;
}

async function postData() {
    try {
        let endpoint = "http://127.0.0.1:1234/v1/chat/completions";

        const data = {
            "model": "gemma-2-2b-it",
            "messages": messageList,
            "temperature": 0.7,
            "max_tokens": 200,
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
    } catch (error) {
        console.error("Error posting data:", error);
        return null;
    }
}

async function handleResponse() {
    const typingIndicator = addTypingIndicator();
    
    try {
        const reply = await postData();
        
        // Remove typing indicator
        typingIndicator.remove();

        if (!reply || !reply.choices || reply.choices.length === 0 || !reply.choices[0].message) {
            console.error("Invalid response from LLM:", reply);
            addMessage("Sorry, I encountered an error. Please try again.");
            return;
        }

        const repliedMessage = reply.choices[0].message.content;
        console.log("AI Response:", repliedMessage);

        addMessage(repliedMessage, false);
        messageList.push({ "role": "assistant", "content": repliedMessage });
    } catch (error) {
        console.error("Error handling response:", error);
        typingIndicator.remove();
        addMessage("Sorry, I encountered an error. Please try again.");
    }
}

function processNewMessage() {
    const input = inputField.value.trim();
    if (!input) return;
    
    inputField.value = "";
    addMessage(input, true);
    messageList.push({ "role": "user", "content": input });
    handleResponse();
}

// Handle Enter key
inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        processNewMessage();
    }
});

// Initial focus
inputField.focus();

