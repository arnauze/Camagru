# Camagru

Small Instagram-like social media allowing users to take a photo and create a photo montage with one of the stickers.

The Frontend is in ReactJS and the backend is in Node.js.

I used some of Amazon Web Services to create the backend:
- AWS Cognito for the user authentification
- AWS Lambda for all the backend functions
- API Gateway for the REST API
- AWS DynamoDB for the database

I used Redux to have a global state in the app.

In this project I had to create my own REST API. The client is sending a message to my API, which calls a Lambda function 
that will return the data back to the client.
