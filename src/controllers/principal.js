const { bodyParser } = require("../lib/bodyparser");
const tareas = require('../models/tareas')



async function createTaskHandler(req, res) {
    try {
        await bodyParser(req);
        new tareas(req.body).save()
            .then(tarea => {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(tarea));
                res.end();
            })
    } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.write("Invalid Data");
        res.end();
    }
}

function getTasksHandler(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    tareas.find({})
        .then(tarea => {
            if (tarea.length) {
                res.write(JSON.stringify(tarea));
                res.end();
            } else {
                res.write('No content');
                res.end();
            }
        })

}

async function updateTaskHandler(req, res) {
    try {
        let { url } = req;

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        if (idKey === "id") {
            await bodyParser(req);
            tareas.findByIdAndUpdate(idValue, req.body)
                .then(tarea => {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(tarea));
                    res.end();
                })

        } else {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write("Invalid Request Query");
            res.end();
        }
    } catch (err) {
        res.writeHead(400, { "Content-type": "text/plain" });
        res.write("Invalid body data was provided", err.message);
        res.end();
    }
}

async function deleteTaskHandler(req, res) {
    try {
        let { url } = req;

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        if (idKey === "id") {
            await bodyParser(req);
            console.log('entro')
            tareas.findByIdAndDelete(idValue)
            .then(tarea => {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(tarea));
                res.end();
            })

        } else {
            res.writeHead(400, { "Content-type": "text/plain" });
            res.write("Invalid Query");
            res.end();
        }
    } catch (err) {
        res.writeHead(400, { "Content-type": "text/plain" });
        res.write("Invalid body data was provided", err.message);
        res.end();
    }

}

module.exports = {
    createTaskHandler,
    getTasksHandler,
    updateTaskHandler,
    deleteTaskHandler
}