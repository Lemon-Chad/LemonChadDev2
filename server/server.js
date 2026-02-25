import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { existsSync } from 'fs';

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

app.post('/contact', async (req, res) => {
    const form = req.body;
    const timestamp = new Date(Date.now()).toString();

    if (!existsSync('./emails/'))
        await fs.mkdir('./emails/');

    await fs.writeFile(
        `./emails/${timestamp} -- ${form.name}.json`,
        JSON.stringify(form, null, 2),
        'utf-8'
    );

    res.send("Email recieved.");
});

server.listen(5342, () => {
    console.log('RPS started on 5342')
})