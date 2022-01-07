const prefix = window.location.port === '8080' ?
    'http://localhost:4000' : 'https://classroomchat.plasmatch.in';
const prefixWs = window.location.port === '8080' ?
    'ws://localhost:4000' : 'wss://classroomchat.plasmatch.in'

export { prefix, prefixWs }