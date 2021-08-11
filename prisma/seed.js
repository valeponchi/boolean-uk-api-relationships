const { PrismaClient } = require('@prisma/client')
const dbClient = new PrismaClient()

const doctors = [
	{
		id: 1,
		first_name: 'Iron',
		last_name: 'Man',
		Specialty: 'Avanger',
	},
	{
		id: 2,
		first_name: 'Captain',
		last_name: 'America',
		Specialty: 'Avanger',
	},
	{
		id: 3,
		first_name: 'Black',
		last_name: 'Panther',
		Specialty: 'Avanger',
	},
	{
		id: 4,
		first_name: 'Captain',
		last_name: 'Marvel',
		Specialty: 'Avenger Plus',
	},
	{
		id: 5,
		first_name: 'Doctor',
		last_name: 'Strange',
		Specialty: 'Avenger',
	},
	{
		id: 6,
		first_name: 'Thor',
		last_name: 'Asgard',
		Specialty: 'God of Thunder',
	},
	{
		id: 7,
		first_name: 'Vision',
		last_name: 'Man',
		Specialty: 'Avanger',
	},
]

const appointments = [
	{
		reason: 'Ronan invasion',
		date: '11.02.1990',
		practice_name: 'Earth',
	},
	{
		reason: 'Thanos invasion',
		date: '11.02.2000',
		practice_name: 'Earth',
	},
	{
		reason: 'another invasion',
		date: '11.02.2020',
		practice_name: 'Earth',
	},
]
//to get a random element ID
const getRandomElement = array => {
	const number = Math.floor(Math.random() * array.length)
	//floor is making the number rounds down
	return array[number]
}

// ARROW FUNCTION:
const seed = async () => {
	const arrayPromises = doctors.map(async doctor => {
		return await dbClient.doctor.create({ data: doctor })
	})

	const createdDoctors = await Promise.all(arrayPromises)

	// console.log(doctorsVals)

	const doctorsIds = createdDoctors.map(({ id }) => id)

	const createdAppointmentsPromises = appointments.map(async appointment => {
		return await dbClient.appointment.create({
			data: {
				...appointment,
				date: new Date(appointment.date).toISOString(),
				// for many to many this one and it is the one suggested by the Docs:
				doctor: { connect: { id: parseInt(getRandomElement(doctorsIds)) } },
			},
		})
	})

	const createdAppointments = await Promise.all(createdAppointmentsPromises)
	//const doctor = await
	console.log('doctors: ', createdDoctors, 'appointments:', createdAppointments)
}

seed()
	.catch(e => console.error(e))
	.finally(async () => {
		await dbClient.$disconnect()
	})

//2ND WAY
//doctor and appointment together:
// const seed = async () => {
// 	const appointment = await dbClient.appointments.create({
// 		data: {
// 			reason: 'an invasion',
// 			practice_name: 'Asgard',
// 			date: new Date('11 August 2010').toISOString(),
// 			doctor: {
// 				// connect: {id: } IF THE DOCTOR EXIST YOU PUT THE ID
// 				create: {
// 					first_name: 'Nick',
// 					last_name: 'Fury',
// 					Specialty: 'Agent',
// 				},
// 			},
// 		},
// 		include: {
// 			doctor: true,
// 		},
// 	})

// 	const newDoctor = await dbClient.doctor.create({
// 		data: {
// 			first_name: 'Mary',
// 			last_name: 'Woo',
// 			Specialty: 'assistant',
// 			appointments: {
// 				create: {
// 					reason: 'terrorists',
// 					date: new Date('11 September 2015').toISOString(),
// 					practice_name: 'Wakanda',
// 				},
// 			},
// 		},
// 		include: {
// 			appointments: true,
// 		},
// 	})

// 	console.log(appointment, newDoctor)
// }

// seed()
// 	.catch(e => console.error(e))
// 	.finally(async () => {
// 		await dbClient.$disconnect()
// 	})

//3RD WAY
//HOW I DID IT BEFORE:
// async function seed() {
// 	await dbClient.doctor.create({
// 		data: {
// 			first_name: 'Wanda',
// 			last_name: 'Maximoff',
// 			Specialty: 'Avanger',
// 			appointment: {
// 				create: {
// 					practice_name: 'Earth',
// 					reason: 'invasion',
// 				},
// 			},
// 		},
// 	})

// 	await dbClient.appointment.create({
// 		data: {
// 			doctorId: 1,
// 			practice_name: 'Earth',
// 			reason: 'alien-invasion',
// 		},
// 	})
// }

// seed()
// 	.catch(e => console.error(e))
// 	.finally(async () => {
// 		await dbClient.$disconnect()
// 	})
