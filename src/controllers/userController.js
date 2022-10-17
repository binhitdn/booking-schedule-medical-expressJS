import userService from "../service/userService";
let handleLogin = async(req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    if(!email||!password){
        return res.status(200).json({
            errCore: 1,
            message: "Email or password is empty"
        })
    }

    let userData = await userService.handleUserLogin(email,password)
    return res.status(200).json({
       errCode: userData.errCode,
       message: userData.errMessage,
         user: userData.user ? userData.user : {}
    })


}

let handleGetAllUsers = async(req,res) => {
    let userId = req.query.id;
    if(!userId){
        return res.status(200).json({
            errCore: 1,
            message: "Id not exist",
            users: []
        })
    }
    let users = await userService.getAllUsers(userId)
    return res.status(200).json({
        errCode: 0,
        errMessage: "Get users success",
        users
    })
    
}
let handleCreateNewUser = async(req,res) => {
    let message = await userService.createNewUser(req.body)
    console.log(message)
    return res.status(200).json({
        message
    })
}
let handleDeleteUser = async(req,res) => {
    let userId = req.body.id;
    if(!userId){
        return res.status(200).json({
            errCore: 1,
            message: "Id not exist"
        })
    }

    let message = await userService.deleteUser(userId)
    return res.status(200).json({
       
        message
    })
}
let handleEditUser = async(req,res) => {
    let data = req.body;
    let message = await userService.editUser(data)
    return res.status(200).json({  
        message
     })
}

let handleGetAllCode = async(req,res) => {
    try {
        let data = await userService.getAllCode(req.query.type);
        return res.status(200).json({
           data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
    })
}
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    handleGetAllCode: handleGetAllCode
}