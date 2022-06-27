
import bcrypt from 'bcryptjs';
import db from "../models/index"

var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    delete user.password;
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = "Your's email isn't exist";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your's email isn't exist";
            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userId === 'ALL') {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            resolve(user);
        } catch (e) {
            reject(e);
        }
    })

}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used. Please try anorther email'
                });
            }
            let hashPasswordFromBcrybt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrybt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve({
                errCode: 0,
                message: 'Ok'
            });

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 1,
                errMessage: "User isn't exist"
            })
        }
        await db.User.destroy({
            where: { id: userId }
        });
        resolve({
            errCode: 0,
            errMessage: "Delete user success"
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                await db.User.update({
                    lastName: data.lastname,
                    firstName: data.firstname,
                    address: data.address
                }, {
                    where: {
                        id: data.id
                    }
                });
                resolve({
                    errCode: 0,
                    errMessage: "update success!"
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "User not found!"
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}