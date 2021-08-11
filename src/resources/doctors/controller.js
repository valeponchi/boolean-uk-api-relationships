const { doctor } = require('../../../src/utils/dbClient')

//GET ALL
const getAllDoctors = async (req, res) => {
	const allDoctors = await doctor.findMany()
	res.json({ data: allDoctors })
}
// function getAllDoctors(req, res) {
// 	doctor.findMany().then(allDoctors => {
// 		res.json({ allDoctors })
// 	})
// }

//GET ONE
const getDoctorById = async (req, res) => {
	const { id } = req.params

	const doc = await doctor.findUnique({ where: { id: parseInt(id) } })
	res.json({ data: doc })
}

//GET ONE PLUS APPOINTMENTS
const getDoctorAppointments = async (req, res) => {
	const { id } = req.params

	const doc = await doctor.findUnique({
		where: { id: parseInt(id) },
		include: {
			appointments: true,
		},
	})
	res.json({ data: doc })
}

//CREATE ONE
async function createOneDoctor(req, res) {
	const newDoctor = req.body
	const createdDoctor = await doctor.create({ data: newDoctor })
	res.json({ data: createdDoctor })

	// try {
	// } catch (error) {
	// 	res.json({ error: error.message })
	// }
}

//DELETE ONE
const deleteDoctor = async (req, res) => {
	const id = parseInt(req.params.id)
	doctor.delete({ where: id })
}

module.exports = {
	getDoctorById,
	getAllDoctors,
	getDoctorAppointments,
	createOneDoctor,
	deleteDoctor,
}
