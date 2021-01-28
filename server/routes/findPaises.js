const express = require("express");
const axios = require("axios");

let app = express();

app.get('/findPaises', async(req, res) => {
    try {
        const resp = await axios.get(
            `https://test.gefco.com.ar/MobileServices/seguridad/findPaises`
        );
        console.log(resp);
        return res.status(200).send(resp.data);
    } catch (error) {
        return res.status(500);
    }
})

// app.get('/login', async(req, res) => {
//     console.log("login");
//     let username = req.query.username;
//     let password = req.query.password;
//     let pais = req.query.pais;
//     try {
//         const resp = await axios.get(
//             `https://test.gefco.com.ar/MobileServices/seguridad/login?username=${username}&password=${password}&pais=${pais}`
//         );
//         console.log(resp);
//         return res.status(200).send(resp.data);
//     } catch (error) {
//         return res.status(500);
//     }
// })



module.exports = app;