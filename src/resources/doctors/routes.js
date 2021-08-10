const doctorsRouter = require('express').Router()

const { getAllDoctors, createOneDoctor } = require('./controller')

doctorsRouter.get('/', getAllDoctors)

doctorsRouter.post('/', createOneDoctor)

module.exports = doctorsRouter
