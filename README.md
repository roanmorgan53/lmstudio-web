# LM Studio Web
This app makes calls from the [LM Studio](https://lmstudio.ai/) REST API, and allows you to interface with the LLM through a web user interface.

## Setup
Installing dependencies:

    npm install

Start the server:

    npm start

Must also be running the llm server via the LM Studio developer tab with your model of choice. 

In order to get everything else up and running you need to edit the ```data``` field inside ```app.js``` updating the model name, and possibly the endpoint if you are not using the default. 

