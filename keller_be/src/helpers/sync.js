"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// sync():

module.exports = async function () {

    // return null;

    /* User */
    const User = require('../models/user.model')
    await User.deleteMany() // !!! Clear collection.
    await User.create({
        "firstName": "Admin",
        "lastName": "User",
        "userName": "adminuser",
        "businessName": "1234567890",
        "email": "admin@example.com",
        "password": "Secure*1234",
        "dateOfBirth": "1980-01-01",
        "tel": "1234567890",
        "isActive": true,
        "isBusiness": false,
        "isPremium": false,
        "taxNr": 1234567890,
        "userType": "admin",
        "startDate": "2023-01-01",
        "endDate": "2024-01-01",
        "future": "Some future info"
    }
    )
  
    
   
   
   

    
    console.log('* Synchronized.')
}