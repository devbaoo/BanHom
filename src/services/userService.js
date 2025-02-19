import db from '../models/index';
import bcrypt from 'bcryptjs';


let handleRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.password || !data.username) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                });
                return;
            }
            let isExist = await checkUserEmail(data.email);
            if (isExist) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, plz try other email'
                });
                return;
            } else {
                let hashPassword = await bcrypt.hash(data.password, 10);
                let user = await db.User.create({
                    username: data.username,
                    image: data.image,
                    email: data.email,
                    password: hashPassword,
                    role: "CUSTOMER"
                });
                resolve({
                    errCode: 0,
                    message: 'Ok',
                    data: user
                })
            }
        } catch (error) {
            reject(error);
        }
    });
};



let handleUserLogin = (email, password, username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            // Tạo điều kiện tìm kiếm dựa vào email hoặc username
            const whereCondition = {};
            if (email) whereCondition.email = email;
            if (username) whereCondition.username = username;

            let user = await db.User.findOne({
                attributes: ['id', 'email', 'role', 'password', 'username'],
                where: whereCondition,
                raw: true,
            });

            if (!user) {
                userData.errCode = 1;
                userData.errMessage = `User not found in our system`;
                resolve(userData);
                return;
            }

            // Compare password
            let check = await bcrypt.compare(password, user.password);

            if (check) {
                userData.errCode = 0;
                userData.errMessage = 'OK';
                delete user.password;
                userData.user = user;
            } else {
                userData.errCode = 3;
                userData.errMessage = 'Wrong password';
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}


let checkUserEmail = (email, username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const whereCondition = {};
            if (email) whereCondition.email = email;
            if (username) whereCondition.username = username;

            let user = await db.User.findOne({
                where: whereCondition
            });

            resolve(!!user);
        } catch (e) {
            reject(e);
        }
    });
}



module.exports = {
    handleUserLogin: handleUserLogin,
    handleRegister: handleRegister
}