import express from 'express'
import productRouter from "./router/product.routes"
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.static('storage'))
app.use("/api/product", productRouter)
app.listen(port, () => {
    console.log(`Server started at ${process.env.APP_URL}:${port}`)
})