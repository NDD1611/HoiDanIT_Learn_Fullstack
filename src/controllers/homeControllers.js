
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

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD
}