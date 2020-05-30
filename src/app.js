const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()  // store our application 
const port = process.env.PORT || 3000;  // for heroku port

const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//setting customized view path
app.set('views', viewPath)
//setting handelbars telling express which templetating engine we are using 
app.set('view engine', 'hbs')
hbs.registerPartials(partialpath)

//app.use() is to customize the server i.e setup static directory 
app.use(express.static(publicDirPath))


app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'shubham'

    })
})

app.get('/about',(req, res)=>{
        res.render('about', {
            title: 'About me',
            name: 'shubham'
        })
})

app.get('/help',(req, res)=>{
        res.render('help', {
            helpText: 'To access this service use /weather',
            title:'Help',
            name: 'shubham'      
        })
   })

app.get('/help/*', (req, res)=>{
    res.send('Help page not found')
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please enter address'
        }) 
    }
    geoCode(req.query.address, (error, {longitude, latitude, place} ={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            } else{
             res.send({
                 forecast: forecastData,
                 place,    //ES-6 object 
                 address: req.query.address
             })
            } 
        })
    })
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide search term'
        })
    }
        res.send({
            products: []
        })
    
})
app.get('*', (req, res)=>{
    res.send('My 404 page')
})

app.listen(port,()=>{
    console.log('server is up on port ' +port) //msg not displayed on browser 
}) 