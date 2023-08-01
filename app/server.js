const express=require( "express");
const http=require( "http");
const swaggerUI=require( "swagger-ui-express");
const swaggerJSDoc=require("swagger-jsdoc");
const mongoose=require("mongoose")
const path = require("path");
const { AllRoutes } = require("./routes/router");


module.exports= class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.conneectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
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
              version: "2.0.0",
              description: "اولین استور سلحشوران",
            },
            servers:[{
                url:"http://localhost:5000"
            }]
          },
          apis: ["./routes/*/*.js"],
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
        const db =  mongoose.connect(this.#DB_URI)
        // eslint-disable-next-line no-console
        console.log(`mongodb connected : ${this.#DB_URI}`)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("db is not conected",error)
        process.exit(1)
    }
  }
  createRoutes() {
    this.#app.use(AllRoutes)
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        statusCode: 404,
        message: "the page is not founded",
      });
    });
    this.#app.use((error, req, res, next) => {
      const statusCode = error.status || 500;
      const message = error.message || "server error";
      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
}
