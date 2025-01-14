const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());

app.get('/downloadmp4', async (req, res, next) => {
    try {
        let url = req.query.url;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }
        let title = 'video';

        await ytdl.getBasicInfo(url, {
            format: 'mp4'
        }, (err, info) => {
            title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
        });

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(url, {
            format: 'mp4',
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)
