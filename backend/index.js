const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.listen(3050,()=> {
    console.log('server running'); 
})

// database connection

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'spotify',
    port:3306
});

db.connect(err => {
    if(err) {
        console.log(err,'dberr');
    }
    console.log('database connected');
})

//get tracks data

app.get('/mostplayedtracks',(req,res) => {
    // let qry = `SELECT trackID,COUNT(*) as count FROM tracks_played GROUP BY trackID ORDER BY count DESC LIMIT 50;`;
    let qry = `SELECT trackID,COUNT(*) as count FROM tracks_played GROUP BY trackID  
    ORDER BY count DESC LIMIT 50`;
    db.query(qry,(err,result) => {
        if(err) {
            console.log(err,'errs');
        }
        if(result.length > 0) {
            res.send({
               message:'all user data' ,
               data: result
            });
        }
    });
});

//get album data

app.get('/mostplayedalbums',(req,res) => {
    let qry = `SELECT albumID,COUNT(*) as count FROM albums_played GROUP BY albumID ORDER BY count DESC LIMIT 20;`;
    db.query(qry,(err,result) => {
        if(err) {
            console.log(err,'errs');
        }
        if(result.length > 0) {
            res.send({
               message:'all user data' ,
               data: result
            });
        }
    })
})

//get last played

app.get('/lastplayed',(req,res) => {
    let qry = `SELECT last_played FROM last_played WHERE id = 1`;
    db.query(qry,(err,result) => {
        if(err) {
            console.log(err,'errs');
        }
        if(result.length > 0) {
            res.send({
               message:'all user data' ,
               data: result
            });
        }
    });
})

// get most played artists
app.get('/mostplayedartists',(req,res) => {
    // let qry = `SELECT artistID,COUNT(*) as count FROM artists_played GROUP BY artistID ORDER BY count DESC LIMIT 50;`;
    let qry = `SELECT artistID,COUNT(*) as count FROM artists_played GROUP BY artistID  
    ORDER BY count DESC LIMIT 50`;
    db.query(qry,(err,result) => {
        if(err) {
            console.log(err,'errs');
        }
        if(result.length > 0) {
            res.send({
               message:'all user data' ,
               data: result
            });
        }
    })
})

app.get('/mostplayedgenres',(req,res) => {
    let qry = 'SELECT genre,COUNT(*) as count FROM genres_played GROUP BY genre ORDER BY count DESC LIMIT 20;';
    db.query(qry,(err,result) => {
        if(err) {
            console.log(err,'errs');
        }
        if(result.length > 0) {
            res.send({
                message:'all genre data',
                data:result
            })
        }
    })
})

//update last played

app.put('/lastplayed',(req,res) => {
    let lastPlayed = new Date(req.body.playedAt);
    lastPlayed = lastPlayed.getFullYear() + '-' +
    ('00' + (lastPlayed.getMonth()+1)).slice(-2) + '-' +
    ('00' + lastPlayed.getDate()).slice(-2) + ' ' + 
    ('00' + lastPlayed.getHours()).slice(-2) + ':' + 
    ('00' + lastPlayed.getMinutes()).slice(-2) + ':' + 
    ('00' + lastPlayed.getSeconds()).slice(-2);
    console.log(lastPlayed);
    let qry = `UPDATE last_played SET last_played = ('${lastPlayed}') WHERE id = 1`;

    db.query(qry,(err,result) => {
        if(err) {
            console.log(err);
        }

        res.send({
            message:'data upated',
        })
    })
});

//send data

app.post('/user',(req,res) => {
    let trackID = req.body.trackID;
    let playedAt = new Date(req.body.playedAt);
    playedAt = playedAt.getFullYear() + '-' +
    ('00' + (playedAt.getMonth()+1)).slice(-2) + '-' +
    ('00' + playedAt.getDate()).slice(-2) + ' ' + 
    ('00' + playedAt.getHours()).slice(-2) + ':' + 
    ('00' + playedAt.getMinutes()).slice(-2) + ':' + 
    ('00' + playedAt.getSeconds()).slice(-2);
    let qry = `insert into tracks_played(trackID, playedAt) values('${trackID}','${playedAt}')`;

    db.query(qry,(err,result) => {
        if(err){
            console.log(err);
        }
        
        res.send({
            message:'data inserted',
        })
    })
})

//send album data
app.post('/album',(req,res) => {
    let albumID = req.body.albumID;
    let playedAt = new Date(req.body.playedAt);
    playedAt = playedAt.getFullYear() + '-' +
    ('00' + (playedAt.getMonth()+1)).slice(-2) + '-' +
    ('00' + playedAt.getDate()).slice(-2) + ' ' + 
    ('00' + playedAt.getHours()).slice(-2) + ':' + 
    ('00' + playedAt.getMinutes()).slice(-2) + ':' + 
    ('00' + playedAt.getSeconds()).slice(-2);
    let qry = `insert into albums_played(albumID, playedAt) values('${albumID}','${playedAt}')`;

    db.query(qry,(err,result) => {
        if(err){
            console.log(err);
        }
        
        res.send({
            message:'data inserted',
        })
    })
})

//send artists data
app.post('/artists',(req,res) => {
    let artistID = req.body.artistID;
    let playedAt = new Date(req.body.playedAt);
    playedAt = playedAt.getFullYear() + '-' +
    ('00' + (playedAt.getMonth()+1)).slice(-2) + '-' +
    ('00' + playedAt.getDate()).slice(-2) + ' ' + 
    ('00' + playedAt.getHours()).slice(-2) + ':' + 
    ('00' + playedAt.getMinutes()).slice(-2) + ':' + 
    ('00' + playedAt.getSeconds()).slice(-2);
    let qry = `insert into artists_played(artistID, playedAt) values('${artistID}','${playedAt}')`;

    db.query(qry,(err,result) => {
        if(err){
            console.log(err);
        }
        
        res.send({
            message:'data inserted',
        })
    })
})

//send genre data
app.post('/genres',(req,res) => {
    let genre = req.body.genre;
    let playedAt = new Date(req.body.playedAt);
    playedAt = playedAt.getFullYear() + '-' +
    ('00' + (playedAt.getMonth()+1)).slice(-2) + '-' +
    ('00' + playedAt.getDate()).slice(-2) + ' ' + 
    ('00' + playedAt.getHours()).slice(-2) + ':' + 
    ('00' + playedAt.getMinutes()).slice(-2) + ':' + 
    ('00' + playedAt.getSeconds()).slice(-2);
    let qry = `insert into genres_played(genre, playedAt) values('${genre}','${playedAt}')`;

    db.query(qry,(err,result) => {
        if(err){
            console.log(err);
        }
        
        res.send({
            message:'data inserted',
        })
    })
})