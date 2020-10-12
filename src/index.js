const http = require('http');
const { Getroutes } = require('./Routes/routes')
const database = require('./database/database')
const server = http.createServer((req, res) => {
    Getroutes(req, res)
})
database.connect()
server.listen(4000, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('servidor corriendo en port 4000')
})
