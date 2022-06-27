import bcrypt from 'bcryptjs';
import db from '../models/index';


var salt = bcrypt.genSaltSync(10);

//ham su de luu 1 user vao database
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('ok create a new user success');
        } catch (e) {
            reject(e);
        }
    })
}

//ham ma hoa password su dung bcryptjs
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true   // khi du lieu tra ve se la 1 array cac obj
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update({
                lastName: data.lastname,
                firstName: data.firstname,
                address: data.address
            }, {
                where: {
                    id: data.id
                }
            }
            )
            resolve("update success!")
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: {
                    id: id
                }
            });
            resolve('delete success!');
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}