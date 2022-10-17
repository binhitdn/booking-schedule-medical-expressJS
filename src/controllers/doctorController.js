import doctorService from "../service/doctorService";
let getTopDocterHome = async (req, res) => {
    let limit = req.query.limit || 10;
    try {
        let response = await doctorService.getTopDocterHomes(limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInfoDoctor(req.body);
        console.log(response)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let response = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getScheduleDoctorByDate = async (req, res) => {
    try {
        let response = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleAddInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.handleAddInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let editInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.editInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetExtraDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getExtraDoctorById(req.query.doctorId);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    getTopDocterHome: getTopDocterHome,
    postInfoDoctor: postInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    handleAddInfoDoctor: handleAddInfoDoctor,
    editInfoDoctor: editInfoDoctor,
    handleGetExtraDoctorById: handleGetExtraDoctorById

}