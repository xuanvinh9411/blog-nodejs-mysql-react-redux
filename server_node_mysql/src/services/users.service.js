'use strict';

const UserRepository  = require('../repositories/user.repository');

class UserService {
    async getAllUsers() {
        return await UserRepository.findAll();
    }

    async getUserById(id) {
         const user = await UserRepository.findById(id);
         if (!user) throw new Error('User not found');
         return user;
    }

    async createUser(userData){
        console.log(`u`,userData);
        if(!userData.name || !userData.email) throw new Error('Name or email are required');
        const userId = await UserRepository.createUser(userData);
        const user = await UserRepository.findById(userId);
        return user;
    }

    async updateUser(id,userData){
        const exists = await UserRepository.getUserById(id);
        if(!exists) throw new Error('not found id');
        await UserRepository.updateUser(id, userData)
        return await UserRepository.getUserById(id);
    }

    async deleteUser(id){
        const user = await UserRepository.findById(id);
            if (!user) {
            throw new Error('User not found');
            }
        await UserRepository.delete(id);
        return user;
    }

}
module.exports = new UserService()