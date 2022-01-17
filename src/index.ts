import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import { useRoutes } from './routes/routes'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 8080

const app = express()
app.use(bodyParser.json())
useRoutes(app)

app.listen(PORT, () => console.log('Server is running 🚀 on port ' + PORT))
