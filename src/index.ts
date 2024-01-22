import express, { Express, NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import AuthRouter from "./routes/AuthRoutes"
import CalculationsRouter from "./routes/CalculationsRoutes"
import bodyParser from "body-parser"
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(bodyParser())
app.use(cors())

app.use("/auth", AuthRouter)
app.use("/calc", CalculationsRouter)

app.use((req: Request, res: Response) => {
    return res.status(404).json({
        message: `Route ${req.path} not found`
    })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Internal Server Error" } = err

    res.status(status).json({
        message
    });
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})