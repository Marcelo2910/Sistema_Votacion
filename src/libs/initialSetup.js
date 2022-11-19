import Role from '../models/Role.js'

export const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return;

        const values = await Promise.all([
            new Role({nombre: "user"}).save(),
            new Role({nombre: "admin"}).save()
        ])

        console.log(values)

    } catch (error) {
        console.error(error)
    }

}