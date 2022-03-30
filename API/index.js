const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const surveysRouter = require("./routes/surveyApi");
const usersRouter = require("./routes/usersApi");
const questionsRouter = require("./routes/questionApi");
const responsesRouter = require("./routes/responseApi");
const answersRouter = require("./routes/answersApi");
const accountsRouter = require("./routes/authentificationApi");

const PORT = process.env.PORT || 3001;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "A TodoList API",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/surveys", surveysRouter);
app.use("/users", usersRouter);
app.use("/questions", questionsRouter);
app.use("/responses", responsesRouter);
app.use("/answers", answersRouter);
app.use("/accounts", accountsRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
