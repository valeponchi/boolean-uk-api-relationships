const appointmentsRouter = require('express').Router()

const { getAllAppointments, createOneAppointment } = require('./controller')

appointmentsRouter.get('/', getAllAppointments)

appointmentsRouter.post('/', createOneAppointment)

module.exports = appointmentsRouter
