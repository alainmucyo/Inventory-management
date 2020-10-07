import express from 'express'

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use(express.static('storage'))
app.listen(port, () => {
    console.log(`Server started at ${process.env.APP_URL}:${port}`)
})