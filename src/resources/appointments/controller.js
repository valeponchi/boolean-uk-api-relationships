const { appointment } = require('../../../src/utils/dbClient')

function getAllAppointments(req, res) {
	appointment.findMany().then(getAllAppointments => {
		res.json({ getAllAppointments })
	})
}

async function createOneAppointment(req, res) {
	const newAppointment = req.body

	try {
		const createdAppointment = await appointment.create({
			data: newAppointment,
		})
		res.json({ data: createdAppointment })
	} catch (error) {
		res.json({ error: error.message })
	}
}

module.exports = { getAllAppointments, createOneAppointment }
