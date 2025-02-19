import userService from '../services/userService';


let handleRegister = async (req, res) => {
    try {
        let data = await userService.handleRegister(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({
            errCode: 500,
            message: 'Internal Error'
        })
    }
};

let handleLoging = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Validation: Cần password và (email hoặc username)
        if (!password || (!email && !username)) {
            return res.status(400).json({
                errCode: 1,
                message: 'Email/username and password are required!'
            });
        }

        const userData = await userService.handleUserLogin(email, password, username);

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user || {}
        });
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'Server error',
            error: error.message
        });
    }
}



module.exports = {
    handleLoging: handleLoging,
    handleRegister: handleRegister
}