const localIp = '192.168.29.27'
// const localIp = 'localhost'

const prefix = window.location.port === '8080' ?
    `http://${localIp}:4000` : 'https://classroom.panipuri.tech';
const prefixWs = window.location.port === '8080' ?
    `ws://${localIp}:4000` : 'wss://classroom.panipuri.tech'

export { prefix, prefixWs }
