const prefix = 'http://localhost:8000/'
// const prefix = 'https://apiv3.plasmatch.in/'



const calender = prefix + 'calender/'
const meetings = prefix + 'meetings/'
const login = prefix + 'login/'
const logout = prefix + 'auth/logout/'
const registration = prefix + 'auth/registration/'
module.exports = { calender, meetings, login, logout, registration }
