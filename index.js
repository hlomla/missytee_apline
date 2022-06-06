const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const API = require('./api');
const { default: axios } = require('axios');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4090;

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const config = {
	connectionString: DATABASE_URL ,
	max: 30,
	ssl:{ rejectUnauthorized : false}
 };
 
 const db = pgp(config);

API(app, db);

app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});

app.post('/api/login', (req, res) => {
	const {username} = req.body;

	if(username !== 'hlomla'){
		accessToken === null
	} else{
		const accessToken = generateAccessToken(username)
		accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
	}
	
})
function generateAccessToken(username) {
    return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45m"})
}