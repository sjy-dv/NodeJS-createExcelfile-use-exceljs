const express = require('express');
const app = express();
const compression = require('compression');
const cors = require('cors');
const exceljs = require('exceljs');
const faker = require('faker');
const { v4:uuidv4 } = require('uuid');
const db = require('./models');

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

db.sequelize
    .authenticate()
    .then(async() => {
        console.log('DB Connecting ...');
        await db.sequelize.sync({ force : false });
    })
    .catch(error => {
        console.log(error);
    })

/**
 *  workbook, sheet, columns, rows => use in execljs
 */

 let userobj = [
     {
         "usercode" : uuidv4(),
         "username" : faker.name.findName()
     },
     {
        "usercode" : uuidv4(),
        "username" : faker.name.findName()
    },
    {
        "usercode" : uuidv4(),
        "username" : faker.name.findName()
    },
    {
        "usercode" : uuidv4(),
        "username" : faker.name.findName()
    },
    {
        "usercode" : uuidv4(),
        "username" : faker.name.findName()
    },
 ]

 app.get('/download', async (req, res) => {
     try { 
        const workbook = await new exceljs.Workbook();
        const sheet = await workbook.addWorksheet('userData');
        sheet.columns = [
                {header : '유저 코드'},
                {header : '유저 이름'}
        ]   
        const createXlsX = () => {
            let xlsxobj = [];
            for(var keys in userobj) {
                let value = userobj[Object.keys(userobj)[keys]];
                let usercode = JSON.stringify(value.usercode);
                let username = JSON.stringify(value.username);
                xlsxobj.push([usercode,username]);
            };
            sheet.addRows(xlsxobj);
            workbook.xlsx.writeFile('./userData.xlsx')
            .catch( err => {
                res.send(err);
            })
        }
        createXlsX();
        if(!createXlsX) res.send('created failed');
        res.send('created complete')
     } catch (error) {
        res.send(error);
     }
 });

 app.get('/dbdownload', async (req,res) => {
     try {
         const workbook = await new exceljs.Workbook();
         const sheet = await workbook.addWorksheet('dbuserData');
         sheet.columns = [
             {header : 'user_id'},
             {header : 'username'},
             {header : 'password'},
         ]
         const dbuserobj = await db.member.findAll();
         const createdbXlsX = () => {
             let dbxlsxobj = [];
             for(var keys in dbuserobj) {
                let value = dbuserobj[Object.keys(dbuserobj)[keys]];
                let user_id = JSON.stringify(value.id);
                let username = JSON.stringify(value.username);
                let password = JSON.stringify(value.password);
                dbxlsxobj.push([user_id, username, password]);
            };
            sheet.addRows(dbxlsxobj);
            workbook.xlsx.writeFile('./dbuserData.xlsx')
            .catch( err => {
                res.send(err);
            })
         }
         createdbXlsX();
         if(!createdbXlsX) res.send('created failed');
         res.send('created complete');
   } catch (error) {
         res.send(error);
     }
 })

app.listen(8081, () => {
    console.log('server on');
});