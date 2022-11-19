import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json' assert { type: 'json' }
import sesionRoutes from './routes/sesiones.routes.js'
import authRoutes from './routes/auth.routes.js'
import {createRoles}  from './libs/initialSetup.js'
import userRoutes from './routes/user.routes.js'
import temasRoutes from './routes/temas.routes.js'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
createRoles()

app.set('pkg', pkg)

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res) => {
    res.status(200).json({msg:'Hola mundo'})
} )

app.use('/sesiones',sesionRoutes)
app.use('/auth', authRoutes)
app.use('/users',userRoutes)
app.use('/temas',temasRoutes)


export default app;