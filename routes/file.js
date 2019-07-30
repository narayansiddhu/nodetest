var express = require('express');
var router = express.Router();
var Path = require('path');
var fs = require('fs');
var path = './files/';


router.get('/', (req, res) => {
    var getDirName = Path.join(__dirname, '../files');
    var newFiles = []
    fs.readdir(getDirName, function (err, files) {
        if (err) {
            res.render('error',{
                errors :"error",
                msg :err
            });
        } else {  
            files.map(list=>{
             var obj ={}
             obj.filename = list
             newFiles.push(obj)
            })
			res.render('file', {
                files: newFiles
            })
        }
    });
})

router.get('/addfiles', (req, res) => {
	res.render('addfile');
 })
router.post('/addfiles', (req, res) => {
    var processs  = req.body.process;
	var keys = req.body.key;
	var values = req.body.value;
    if(processs && keys && values){
    
        var filename = path + processs + '.env';

        if (fs.existsSync(filename)) {
            res.render('addfile',{
                errors :"error",
                msg : "You have already created file with this name"
            });
        } else {
            var fileData = `${keys}=${values}`;
            fs.writeFile(filename, fileData, (err, success) => {
                if (err) {
                    res.render('error',{
                        errors :"error",
                        msg :err
                    });
                } else {
                   req.flash('success_msg', 'You are added a new .env file');
                   res.redirect('/');
         
                }
            })
        }

    }else{
        res.render('addfile',{
            errors :"error",
            msg : "Please Enter All fields"
        });
    }   
 
})
router.get('/searchfiles', (req, res) => {
	res.render('search');
})
router.post('/searchfiles', (req, res) => {
    var getProcess = req.body.process    
    if (getProcess) {
        getProcess = getProcess.replace(".env","")
        let file = path + getProcess + '.env';
        var fileData = "";

        if (fs.existsSync(file)) {

            var readStream = fs.createReadStream(file);

            readStream.setEncoding('UTF8');

            readStream.on('data', function (getstreamData) {
                fileData = getstreamData
            });
            readStream.on('end', function () {   
                var values = fileData.split('=')
                 res.render('search', {
                    filename: getProcess,
                    key : values[0],
                    value : values[1]
                })

            });
        } else {
            res.render('search',{
                errors :"error",
                msg : "File Not Found"
            });
            
        }
    } else {
        res.render('search',{
            errors :"error",
            msg : "File Not Found"
        });
    }
})



module.exports = router;