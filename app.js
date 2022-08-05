'use strict';

// Node.js Core Modules
const http = require('http');

// third party modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 내가 임포트한 파일
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not fount</h1>');
});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000); // 위의 코드와 동등한 결과를 간단하게 표현