import express from "express";
import home from "../controllers/home";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import specialityController from "../controllers/specialityController";
import patientController from "../controllers/patientController";
import {verifyToken} from "../middleware/VerifyToken.js";
let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/user", home.getCRUD);
    router.post("/kaka", home.postCRUD);
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode', userController.handleGetAllCode)
    router.get('/api/top-docter-home', doctorController.getTopDocterHome)

    router.post('/api/save-infor-doctors', doctorController.postInfoDoctor)
    router.put('/api/edit-info-doctor', doctorController.editInfoDoctor)

    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.get('/api/get-all-speciality', specialityController.getAllSpeciality)
    router.get('/api/get-speciality-by-id',specialityController.getSpecialityById)
    router.post('/api/create-new-speciality', specialityController.createNewSpeciality)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate)
    router.post('/api/add-info-doctor', doctorController.handleAddInfoDoctor)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.handleGetExtraDoctorById)
    router.post('/api/patient-book-appointment', patientController.handlePatientBookAppointment)
    return app.use(router);
}


module.exports = initWebRoutes;