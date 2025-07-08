import express from "express"
import cors from "cors"
import todoRoutes from "./src/routes/todoroutes.js"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const app = express()

// Configuración de CORS más permisiva
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:4000',
    'https://todobackend-u0sn.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: 'Todo API funcionando correctamente' })
})

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'API para gestionar tareas',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://todobackend-u0sn.onrender.com',
        description: 'Servidor de producción',
      }
    ],
  },
  apis: ['./src/routes/todoroutes.js']
}

const swaggerDocument = swaggerJsdoc(swaggerOptions)

app.use("/api/todos", todoRoutes)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app