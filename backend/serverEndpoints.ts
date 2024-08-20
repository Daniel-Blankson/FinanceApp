import express from "express";
import dotenv from "dotenv";
import { main } from "./prisma/database";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(function (request, response, next) {
  if (request.headers.origin) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorisation"
    );
    response.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,PATCH,POST,DELETE"
    );
    if (request.method === "OPTIONS") return response.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Express + TypeScript Servers");
});

app.post("/New-User", async (request, response) => {
  console.log("Server handling request...");

  const userName = request.body.name;
  const userEmail = request.body.email;

  console.log(
    `New user details:: User Name: ${userName}, User Email ${userEmail}`
  );

  try {
    await main(userName, userEmail);
    console.log("User details submitted succesfully");
    response.status(201).send("User details submitted succesfully");
  } catch (error) {
    console.log(`There was an error in submitting a new user:: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
