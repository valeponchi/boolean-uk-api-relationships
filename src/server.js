const express = require('express')

const morgan = require('morgan')

const app = express()

const doctorsRouter = require('./resources/doctors/routes')
const appointmentsRouter = require('./resources/appointments/router')

//middlewares
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use('/doctors', doctorsRouter)
app.use('/appointments', appointmentsRouter)

app.get('*', (req, res) => {
	res.status(404).json({ msg: 'No route is matching your request!' })
})

//start the server
app.listen(4000, () => {
	console.log('Server is connected!')
})
