const { appointment, doctor } = require('../../../src/utils/dbClient')

// function getAllAppointments(req, res) {
// 	appointment.findMany().then(getAllAppointments => {
// 		res.json({ getAllAppointments })
// 	})
// }
// OR THIS WAY:
const getAllAppointments = async (req, res) => {
	// appointments?order=recent
	// 'order' is the key inside re req-obj and 'recent' is the value
	const { order } = req.query
	console.log(req.query)

	let allAppointments = null

	if (order === 'recent') {
		allAppointments = await appointment.findMany({
			orderBy: { date: 'desc' },
		})
	} else {
		allAppointments = await appointment.findMany()
	}
	res.json({ data: allAppointments })
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
