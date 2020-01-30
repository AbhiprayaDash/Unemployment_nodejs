const express = require('express');
var exphbs  = require('express-handlebars');
var mongoose= require('mongoose');
var bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/unemproject', {
    useNewUrlParser: true
})
.then(()=>console.log('mongo connected'))
.catch(err=>console.log(err))
require('./models/idea');
require('./models/idea1');
require('./models/idea2');


const Idea = mongoose.model('ideas');
const Idea1 = mongoose.model('ideas1');
const Idea2 = mongoose.model('ideas2');
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/gettowork',function (req,res)
{
    res.render('gettowork');
});
app.get('/companies',function (req,res)
{
    res.render('companies');
});
app.get('/jobs',function (req,res)
{
    res.render('jobs');
});
app.get('/skill',function (req,res)
{
    res.render('skill');
});
app.get('/startup',function (req,res)
{
    res.render('startup');
});

app.get('/indexreg',function (req,res)
{
    res.render('indexreg');
});

app.get('/book',function (req,res)
{
    res.render('book');
});
app.post('/book,')
app.post('/startup',function (req,res)
{
    let errors=[];
    if(!req.body.email)
    {
      errors.push({text:'Enter Email ID'});
    }
    if(!req.body.name)
    {
      errors.push({text:'Enter Name'});
    }
    if(!req.body.subject)
    {
      errors.push({text:'Enter Subject'});
    }
    if(!req.body.message)
    {
      errors.push({text:'Enter Message'});
    }
    if(errors.length>0)
    {
        res.render('startup',{
            errors:errors,
            email:req.body.email,//dont remove the email in text box
            name:req.body.name,
            message:req.body.message,
            subject:req.body.subject
        });
    }
    else
    {
        const newUser = {
            email:req.body.email,
            name:req.body.name,
            message:req.body.message,
            subject:req.body.subject
        }
        new Idea(newUser)
          .save()
          .then(idea =>{
              res.redirect('startup');
          })
}});

app.post('/indexreg',function (req,res)
{
    let errors=[];
    if(!req.body.email)
    {
      errors.push({text:'Enter Email ID'});
    }
    if(!req.body.name)
    {
      errors.push({text:'Enter Name'});
    }
    if(!req.body.subject)
    {
      errors.push({text:'Enter Subject'});
    }
    if(!req.body.message)
    {
      errors.push({text:'Enter Message'});
    }
    if(errors.length>0)
    {
        res.render('indexreg',{
            errors:errors,
            email:req.body.email,//dont remove the email in text box
            name:req.body.name,
            message:req.body.message,
            subject:req.body.subject
        });
    }
    else
    {
        const newUser = {
            email:req.body.email,
            name:req.body.name,
            message:req.body.message,
            subject:req.body.subject
        }
        new Idea1(newUser)
          .save()
          .then(idea =>{
              res.redirect('indexreg');
          })
}});


app.post('/book',function (req,res)
    {
        let errors=[];
        if(!req.body.email)
        {
            errors.push({text:'Email ID is required'});
        }
        if(!req.body.name)
        {
            errors.push({text:'passwords dont Match'});
        }
        if(!req.body.password)
        {
            errors.push({text:'password size must be greater than 4'});
        }
        if(!req.body.password2)
        {
        res.render('book',{
            errors:errors,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            password2:req.body.password2
        });
    }
    else{
        Idea2.findOne({email:req.body.email})
        .then(user=> {
            if(user){
                req.flash('error_msg','Email already Registered');
                res.redirect('book');

            }
            else{
                const newUser = new Idea2({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    password2:req.body.password2

                    
                   
                });
                //10 is no of characters to be encrypted in password
                bcrypt.genSalt(10,(err,salt) =>{
                    bcrypt.hash(newUser.password,salt,(err,hash) =>{
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                          .then(user => {
                              req.flash('success_msg','you are now registered and can log in');
                              res.redirect('/book');
                          })
                          .catch(err => {
                              console.log(err);
                              return;
                          })

                    })
                })
            }
        
        })
    }
        });
app.listen(port,() =>{
    console.log('server started on port ${port}');
});