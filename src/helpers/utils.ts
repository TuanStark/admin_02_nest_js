const bcrypt = require('bcrypt');
const saltRounds = 10; 

export const hashPasswordhelper = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
        console.log(error)
    }
}
// compare password
export const comparePasswordhelper = async (plainPassword: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.log(error)
    }
}