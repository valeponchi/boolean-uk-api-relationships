const { PrismaClient } = require('@prisma/client')
const dbClient = new PrismaClient()

async function seed() {
	await dbClient.doctor.create({
		data: {
			first_name: 'Wanda',
			last_name: 'Maximoff',
			Specialty: 'Avanger',
			appointment: {
				create: {
					practice_name: 'Earth',
					reason: 'invasion',
				},
			},
		},
	})

	await dbClient.appointment.create({
		data: {
			doctorId: 1,
			practice_name: 'Earth',
			reason: 'alien-invasion',
		},
	})
}

seed().finally(() => {
	dbClient.$disconnect
})
