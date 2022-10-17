import db from "../models/index";
import _, { attempt } from "lodash";
import schedule from "../models/schedule";
import moment from "moment";

let getTopDocterHomes = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.users.findAll({
                limit: limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: db.allcodes,
                    as: 'positionData',
                    attributes: ['valueEn', 'valueVi']
                }, {
                    model: db.allcodes,
                    as: 'genderData',
                    attributes: ['valueEn', 'valueVi']
                }],

                where: {
                    roleId: 'R2'
                },
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                message: 'Find Doctor Success',
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}
let saveDetailInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
           
            let doctor = await db.markdowns.findOne({
                where: {
                    doctorId: inputData.doctorId
                }
            })
            if (doctor) {
                await db.markdowns.update({
                    contentHTML: inputData.contentHTML,
                    contentMarkdowns: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                    specialtyId: inputData.specialtyId,
                    clinicId: inputData.clinicId
                }, {
                    where: {
                        doctorId: inputData.doctorId
                    }
                })
                resolve({
                    errCode: 0,
                    errMessage: "Update detail information doctor success!"
                })
            } else {
                if ((!inputData.contentHTML) && (!inputData.contentMarkdown)) {
                    resolve({
                        errCode: 1,
                        errMessage: "Missing Parameter"
                    })
                } else {

                    await db.markdowns.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdowns: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId
                    })
                 
                    resolve({
                        errCode: 0,
                        errMessage: "Save detail information doctor success!"
                    })
                }
                let post = await db.doctors_clinics_specialties.create({
                    doctorId: inputData.doctorId,
                    specialtyId: inputData.specialtyId
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let editInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if ((!inputData.contentHTML) && (!inputData.contentMarkdown)) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter"
                })
            } else {
                let doctor = await db.markdowns.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    }
                })
                if (doctor) {
                    await db.markdowns.update({
                        contentHTML: inputData.contentHTML,
                        contentMarkdowns: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId
                    }, {
                        where: {
                            doctorId: inputData.doctorId
                        }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: "Update detail information doctor success!"
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Doctor not found!"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.users.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: db.allcodes,
                    as: 'positionData',
                    attributes: ['valueEn', 'valueVi']
                }, {
                    model: db.allcodes,
                    as: 'genderData',
                    attributes: ['valueEn', 'valueVi']
                },

                {
                    model: db.doctors,
                    include: [
                        {
                            model: db.allcodes,
                            as: 'priceTypeData',
                            attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.allcodes,
                            as: 'provinceTypeData',
                            attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.allcodes,
                            as: 'paymentTypeData',
                            attributes: ['valueEn', 'valueVi']
                        },
                    ]
                },
                ],

                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                message: 'Find Doctor Success',
                data: doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
let bulkCreateSchedule = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputData.arrSchedule) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter"
                })
            } else {
                let arrSchedule = inputData.arrSchedule;
                if (arrSchedule.length > 0) {
                    arrSchedule.map(item => {
                        item.maxNumber = 10;
                        return item;
                    })
                }

        
            

                let existing = await db.schedules.findAll({
                    where: {
                        doctorId: 3
                    },
                    attributes: ["doctorId", "date", "timeType", "maxNumber"],
                    raw: true
                })
                let existingNew = [];
                existing.map(item => {
                    let object = {};
                    object.doctorId = parseInt(item.doctorId);
                    object.date = moment(item.date).format("MM/DD/YYYY")
                    object.timeType = item.timeType
                    object.maxNumber = item.maxNumber
                    existingNew.push(object)
                })




                let toCreate = _.differenceBy(arrSchedule, existing, ['timeType', 'date'])


                let newSchedule = arrSchedule.filter(
                    ar => !existingNew.find(rm => (
                        rm.doctorId == ar.doctorId
                        && rm.timeType == ar.timeType
                        && rm.date == ar.date)

                    )

                )

                if (!newSchedule || newSchedule.length <= 0) {
                    resolve(
                        {
                            errCode: 2,
                            errMessage: "Schedules is not change"
                        }
                    )
                } else {
                    await db.schedules.bulkCreate(newSchedule)
                    resolve({
                        errCode: 0,
                        errMessage: "Create schedule is success"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getScheduleDoctorByDate = (doctorId, date) => {
   
   
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = await db.schedules.findAll({
                where: {
                    doctorId: doctorId,
                    date: date
                },
                attributes: ["doctorId", "date", "timeType", "maxNumber"],
                include: [{
                    model: db.allcodes,
                    as: 'timeTypeData',
                    attributes: ['valueEn', 'valueVi']
                }],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                message: 'Find Schedule Success',
                data: schedule
            })
        } catch (e) {
            reject(e)
        }
    })
}
let handleAddInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        console.log("Input Data: ",inputData)
        try {
          
            let doctor = await db.doctors.findOne({
                where: {
                    doctorId: inputData.doctorId
                }
            })
            console.log("Doctor: ",doctor)
            if (doctor) {

                await db.doctors.update({
                    doctorId: inputData.doctorId,
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    priceId: inputData.price,
                    provinceId: inputData.province,
                    paymentId: inputData.payment,
                    addressClinic: inputData.addressClinic,
                    nameClinic: inputData.nameClinic,
                    note: inputData.note,
                }, {
                    where: {
                        doctorId: inputData.doctorId
                    }
                })
                
                
                {inputData.specialtyId && inputData.specialtyId.map( async(item) => {
                    let specialty = await db.Doctor_Clinic_Specialty.findOne({
                        where: {
                            doctorId: inputData.doctorId,
                            specialtyId: item
                        }
                    })
                        if (!specialty){
                            await db.doctors_clinics_specialties.create({
                                doctorId: inputData.doctorId,
                                specialtyId: item
                            })
                        }
                })
            }
                    
                
                resolve({
                    errCode: 0,
                    errMessage: "Update detail information doctor success!"
                })
            } else {

                await db.doctors.create({
                    doctorId: inputData.doctorId,
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    priceId: inputData.price,
                    provinceId: inputData.province,
                    paymentId: inputData.payment,
                    addressClinic: inputData.addressClinic,
                    nameClinic: inputData.nameClinic,
                    note: inputData.note,
                    count: 0,
                })
                await db.doctors_clinics_specialties.create({
                    doctorId: inputData.doctorId,
                    specialtyId: inputData.specialty
                })

                resolve({
                    errCode: 0,
                    errMessage: "Create detail information doctor success!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getExtraDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (doctorId) {
                let Doctor_Info = await db.doctor_infos.findOne({
                    where: {
                        doctorId: doctorId
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.allcodes, as: 'priceTypeData', attributes: ['valueEn', 'valueVi', 'valueJa'] },
                        { model: db.allcodes, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi', 'valueJa'] },
                        { model: db.allcodes, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi', 'valueJa'] },
                    ]
                })
            } else {

            }
            resolve(Doctor_Info)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getTopDocterHomes: getTopDocterHomes,
    saveDetailInfoDoctor: saveDetailInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    handleAddInfoDoctor: handleAddInfoDoctor,
    editInfoDoctor: editInfoDoctor,
    getExtraDoctorById: getExtraDoctorById

}