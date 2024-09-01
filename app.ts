const express = require('express')
const morgan = require('morgan')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const AuthRouter = require('./routes/users')
const swaggerSchemas = require('./swaggerSchemas')
const app = express()
// Swagger Ui
const options = {
    definition: {
      openapi: "3.1.0",
      components:{
        schemas: swaggerSchemas
    },
      info: {
        title: "Alx Portfolio project (Expeses Tracker)",
        version: "0.1.0",
        description:
          "This is a documentation of the expense tracker endpoints project",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Namycodes",
          url: "https://namycodes.vercel.app",
          email: "namycodes@yahoo.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);


if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}


app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/v1/auth',AuthRouter)


module.exports = app