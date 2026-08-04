#API List for the PAIRUP 

[AUTH ROUTER]
- POST /signup
- POST /login
- POST /logout 

[CONNECTION REQUEST ROUTER]
- POST /request/send/interested/:userID
- POST /request/send/ignored/:userID
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID

[PROFILE ROUTER]
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

[USER ROUTER]
- GET /user/feed
- GET /user/connections 
- GET /user/requests


