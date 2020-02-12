## Setup instructions

If you have Docker Engine installed locally, you can run the following composer command in your shell regardless of which operating system you are using:

```
git clone https://github.com/NickLont/momice.git
cd nodejs-assignment
docker-compose build
docker-compose up
```
If not install from: https://docs.docker.com/install/

`.env.sample` file needs to be renamed to `.env` and be given valid values both in the root folder and
in /frontend

## Usage

A node server is started in port `3002` and a mongoDB database in `27017`.
The front-end of the app can be view in `http://localhost:8003/`.

#### The REST Api:

- `GET http://localhost:3002/events/all` returns all available events
- `POST http://localhost:3002/events/event` allows us to post a new event
- `GET http://localhost:3002/events/event?id= OR name=` returns an event
- `DELETE http://localhost:3002/events/event?id=` deletes an event

- `GET http://localhost:3002/guests/all` returns all available guests
- `POST http://localhost:3002/guests/guest` allows us to post a new guest
- `DELETE http://localhost:3002/events/event?id=` deletes a guest

#### Testing

To run tests, inside the `/frontend` folder run `yarn test`. 
This will run the e2e tests checking the pages availability. It uses `Jest`, and `pupeteer`
