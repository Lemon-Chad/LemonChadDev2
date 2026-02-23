import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const clientPath = `${__dirname}/../client/`;
console.log(`Serving static from ${clientPath}`)

app.use(express.static(clientPath));

const server = createServer(app);

server.on('error', (err) => {
    console.log(err);
})

app.post('/contact', (req, res) => {
    const form = req.body;
    const timestamp = Date.now();

    fs.writeFile(
        `./emails/${timestamp}.json`,
        JSON.stringify(form, null, 2),
        'utf-8'
    );
});

server.listen(8133, () => {
    console.log('RPS started on 5000')
})