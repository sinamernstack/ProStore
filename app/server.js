const express = require("express");
const http = require("http");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const mongoose = new require("mongoose");
const path = require("path");
const { AllRoutes } = require("./routes/router");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors")

module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.initRedis()
    this.configApplication();
    this.conneectToMongoDB();
    this.createServer(); 
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(cors())
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJSDoc({
          swaggerDefinition: {
            info: {
              title: "store",
              version: "6.2.8",
              description: "اولین استور سلحشوران",
              license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
              },
              contact: {
                name: "sina afkham",
                url: "https://salahshooran.co",
                email: "sina.fixer13@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:5000",
              },
            ],
          },
          apis: ["./app/routes/**/*.js"]
        })
      )
    );
  }

  createServer() {
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }

  conneectToMongoDB() {
    try {
      mongoose.connect(this.#DB_URI);

      mongoose.connection.on("connected", () => {
        console.log("mongoose connected to DB");
      });

      mongoose.connection.on("disconnected", () => {
        console.log("mongoose disconnected ");
      });

      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        process.exit(0);
      });

      console.log(`mongodb connected : ${this.#DB_URI}`);
    } catch (error) {
      console.log("db is not conected", error);
      process.exit(1);
    }
  }


  createRoutes() {
    this.#app.use(AllRoutes);
  }


  initRedis(){
    require("./utils/init_redis")
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("صفحه مورد نظر یافت نشد"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
