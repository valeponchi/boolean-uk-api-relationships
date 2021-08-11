const doctorsRouter = require('express').Router()

const {
	getDoctorById,
	getAllDoctors,
	getDoctorAppointments,
	createOneDoctor,
	deleteDoctor,
} = require('./controller')

doctorsRouter.get('/', getAllDoctors)

doctorsRouter.get('/:id/appointments', getDoctorAppointments)

doctorsRouter.get('/:id', getDoctorById)

doctorsRouter.post('/', createOneDoctor)

doctorsRouter.delete('/:id', deleteDoctor)

module.exports = doctorsRouter
