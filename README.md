# Camagru

Small Instagram-like social media allowing users to take a photo and create a photo montage with one of the stickers.\n

The Frontend is in ReactJS and the backend is in Node.js.\n

We used some of the Amazon Web Services to create the backend:\n
	- AWS Cognito for the user authentification\n
	- AWS Lambda for all the backend functions\n
	- API Gateway for the REST API\n
	- AWS DynamoDB for the database\n

API:

/posts\n
GET\n
POST\n
	/user\n
		/{user_id}\n
		GET\n
	/{post_id}\n
	DELETE\n
		/social\n
			/comment\n
			POST\n
			/like\n
			POST\n

/users\n
POST\n
	/find\n
	GET\n
	/{username}\n
	GET\n
	PUT\n
