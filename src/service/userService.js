import db from "../models/index";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.users.findOne({
                    where: { email: email },
                    attributes: ["roleId", "email", "password", "firstName", "lastName"],
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = "Login success";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3
                        userData.errMessage = "Wrong password"
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = "User is not exist"
                }

            } else {
                userData.errCode = 1
                userData.errMessage = "The email you entered is not registered"
                console.log(userData)


            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }


        } catch (err) {
            reject(err)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = db.users.findAll({
                    attributes: {
                        exclude: ["password"]
                    }

                })
            }
            if (userId && (userId !== 'ALL')) {

                users = db.users.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ["password"]
                    }

                })
            }


            resolve(users)
        } catch (err) {
            reject(err)
        }
    })

}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: "The email you entered is already registered"
                })
            } else {
                let hashPw = await hashUserPassword(data.password);
                await db.users.create({
                    email: data.email,
                    password: hashPw,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phone: data.phone,
                    positionId: data.positionId,
                    image: data.image
                })
                resolve(
                    {
                        errCode: 0,
                        message: 'OK'
                    }
                )
            }



        } catch (err) {
            reject(err)
        }
    }
    )
}
let hashUserPassword = (password) => {

    return new Promise( async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (e) {
            reject(e)
        }
    })

}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'The user is not exist'
                })
            }

            let user = await db.users.findOne({
                where: { id: data.id },
                raw: false

            })

            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.phone = data.phone
                user.image = data.image
                user.roleId = data.roleId
                user.positionId = data.positionId
                user.gender = data.gender
                await user.save()


                resolve({
                    errCode: 0,
                    errMessage: 'The user is edited'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'The user is not exist'
                })
            }




        } catch (e) {
            reject(e)

        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 0,
                    errMessage: 'The user is not exist'
                })
            }
            await db.users.destroy({
                where: { id: userId }
            })

            resolve({
                errCode: 0,
                errMessage: 'The user is deleted'
            })





        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

let getAllCode = (typeI) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeI) {
                resolve({
                    errCode: 1,
                    errMessage: 'The type is not exist'
                })
            } else {
                let res = {};
                let allcode = await db.allcodes.findAll(
                    {
                        where: { type: typeI }
                    })
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllCode: getAllCode
}