# Digital Lawyer - Hackathon Backend

My team : Me [Hasan] , Fady , Hanan , Roni and Fathi

Me and Fady worked in the backend to create a sign up and login endpoints

We also configured the OpenAI to become a lawyer and only answer lawyer stuff questions.

## Project

Our project came to make it easier for citizens who do not know how to write a small lawsuit that does not require a lawyer to write it , so instead of paying for a lawyer to do all the job , you can do it yourself using our digital lawyer , you also have the option to ask him in 3 different languages [Arabic , Hebrew and English] and get the answer In your picked language.

### Links

Backend : https://hackathon-backend-biy0.onrender.com

Frontend: https://lawyersss.netlify.app/

### Backend Endpoints:

Users

GET all users : /api/v1/users
POST create new account : /api/v1/users/create
POST login to your account : /api/v1/users/login
DELETE user: /api/v1/users/delete/[user id]

OpenAI

POST /api/v1/chat
