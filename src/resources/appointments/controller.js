const { appointment, doctor } = require('../../../src/utils/dbClient')

function getAllAppointments(req, res) {
	appointment.findMany().then(getAllAppointments => {
		res.json({ getAllAppointments })
	})
}

async function createOneAppointment(req, res) {
	const { doctorId, reason, date, practice_name } = req.body

	const newAppointment = {
		reason,
		practice_name,
		date: new Date(date).toISOString(),
	}
	const app = await appointment.create({
		data: {
			...newAppointment,
			doctor: { connect: { id: parseInt(doctorId) } },
		},
	})
	res.json({ data: app })

	// try {
	// } catch (error) {
	// 	res.json({ error: error.message })
	// }

	//ANOTHER WAY:
	// try {
	// 	const doctorUpdated = await doctor.update({
	// 		where: { id: parseInt(doctorId) },
	// 		data: { appointments: { create: { newAppointment } } },
	// 	})
	// 	res.json({ data: doctorUpdated })

	// } catch (error) {
	// 	res.json({ error: error.message })
	// }
}

module.exports = { getAllAppointments, createOneAppointment }

// const createdAppointment = await appointment.create({
// 	data: newAppointment,
// })
// res.json({ data: createdAppointment })
