# Devtinder

## authRouter

- POST /signup
- POST /signin
- POST /signout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequest

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/send/accepted/:userId
- POST /request/send/rejected/:userId

## userRouter

- GET user/connections
- GET user/requests
- GET user/feed - Get you the profile of other user.

### Status : ignore,interested, rejected, accepted
