"use strict";
const db = require('../config/database');

class UserRepository {
    async findAll(){
        const [rows] = await db.query(`SELECT * FROM users`);
        console.log(rows);
        return rows
    }

    async findById(id) {
        const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`,[id]);
        console.log(rows);
        return rows[0]
    }

    async createUser(userDate){ 
        const {name , email } =  userDate;
        console.log(`userDate`, userDate);
        const [result] = await db.query(`INSERT INTO users (name, email) VALUES (?, ?)`,[name, email]);
        console.log(result);
        return result.insertId;
    }

    async updateUser(id, userData){
        const {name, email} = userData;
        const [result] = await db.query(`UPDATE users SET name = ?, email = ? WHERE id = ?`,[name, email , id]);
        console.log(result);
        return result.insertId;
    }

    async deleteUser(id){
        const [result]  = await db.query(`DELETE FROM users WHERE id = ?`,[id]);
        console.log(result);
        return result;
    }
}

module.exports =  new UserRepository();