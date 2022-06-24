
import db from '../models/index.js'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
    // choc toi service de tao 1 user
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('post crud from server')
}

let displayCRUD = async (req, res) => {
    // choc toi service de lay tat ca user tren database
    let data = await CRUDService.getAllUser();
    // render va truyen du lieu cho file displayCRD.ejs
    return res.render('displayCRUD.ejs', {
        dataTables: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check userData
        return res.render("editCRUD.ejs", {
            user: userData
        })
    } else {
        return res.send('User not found')

    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let message = await CRUDService.updateUserData(data)
    console.log(message)
    return res.send('update done!')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD
}