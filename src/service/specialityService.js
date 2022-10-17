import db from '../models/index';

let getAllSpecialities = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialities = await db.specialties.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                
            },
            )
            resolve(specialities)

        } catch (e) {
            resolve(e)
        }
    })
}
let createNewSpeciality = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = await db.specialties.create(
                {
                    name: data.name,
                    image: data.avatar,
                    description: data.contentHTML
                    
                }
            )
            
            resolve(message)
        } catch (e) {
            resolve(e)
        }
    }
    )
}
let getSpecialityById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = await db.specialties.findOne({
                where: {
                    id: data
                },
                raw: true
            },
           )    
            resolve(message)
        } catch (e) {
            resolve(e)
        }
    }
    )
}

module.exports = {
    getAllSpecialities: getAllSpecialities,
    createNewSpeciality: createNewSpeciality,
    getSpecialityById: getSpecialityById
   
}