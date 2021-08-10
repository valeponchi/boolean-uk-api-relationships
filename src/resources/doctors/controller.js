const { doctor } = require('../../../src/utils/dbClient')

function getAllDoctors(req, res) {
	doctor.findMany().then(allDoctors => {
		res.json({ allDoctors })
	})
}

async function createOneDoctor(req, res) {
	const newDoctor = req.body

	try {
		const createdDoctor = await doctor.create({ data: newDoctor })
		res.json({ data: createdDoctor })
	} catch (error) {
		res.json({ error: error.message })
	}
}

module.exports = { getAllDoctors, createOneDoctor }
