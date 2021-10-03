const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const invoiceRouter = require('./routers/invoice')
const cors = require("cors");
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors());
// app.use(userRouter)
// app.use(taskRouter)
app.use(invoiceRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})