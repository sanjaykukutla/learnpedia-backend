const express = require('express');

const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cookieParser = require('cookie-parser');
const {dbConnect} = require('./server');
const cors = require("cors");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API"
    },
    servers:[
      {
        url : "http://localhost:3500"
      }
    ],
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);


const app = express();

app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(specs))

//my routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", authRoutes)
app.use("/api", courseRoutes)



const port = 3001;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

