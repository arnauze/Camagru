# Camagru

Small Instagram-like social media allowing users to take a photo and create a photo montage with one of the stickers.

The Frontend is in ReactJS and the backend is in Node.js.

We used some of the Amazon Web Services to create the backend:
	- AWS Cognito for the user authentification
	- AWS Lambda for all the backend functions
	- API Gateway for the REST API
	- AWS DynamoDB for the database

API:

/posts
GET
POST
	/user
		/{user_id}
		GET
	/{post_id}
	DELETE
		/social
			/comment
			POST
			/like
			POST

/users
POST
	/find
	GET
	/{username}
	GET
	PUT
