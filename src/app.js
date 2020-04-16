const express = require('express')
const request = require('request')
const path = require("path")
const hbs = require('hbs')

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


//console.log(__dirname)//provides direcotory of file
//console.log(__filename)//provides the entire path of the file 
//console.log(path.join(__dirname, ".."))//adds two path



const app = express()
const port = process.env.PORT || 3000 //env is object that access environmet variables

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join (__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebar engine and view location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//set up static director to serve 
app.use(express.static(publicDirectoryPath))
app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Sanjhi Pandey'
    })
})

// app.get('',(req, res) => {
//     req.setEncoding('<h1>Hello Express !</h1>')// you can send html reponse
// })

// app.get('/help', (req, res) => {
//     res.send({           // you can send json response by sending objects, objects in array it will display json
//         name: 'Andrew',
//         age: 27
//     })
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Sanjhi Pandey'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:"Help",
        content:"are you here to find help ",
        name:"Sanjhi Pandey"
        
    })
})
app.get('/weather', (req, res) => {
    const address =req.query.address
    if(!address){
        return(res.send({
            error:"You must provide address"
        }))
    }
    else{
        geocode(address, (error, {latitude, longitude, location}= {}) => {
            if(error){
                return(res.send({
                    error:error
                }))
            }
          
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return(res.send({
                        error:error
                    }))
                    
                }
                res.send({
                    forecast:forecastData,
                    location:location})
               
              })
        
            })
    }
  
})

// app.get('/products' , (req, res) =>{
//     if(!req.query.search) {
//         return (res.send({
//             error:"you must provide a search term"
//         }))
//     }
//     console.log(res.query.search)
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404' , 
        name:'Sanjhi Pandey',
        errorMessage: 'Help article not found'


    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Sanjhi Pandey',
        errorMessage: 'Page not Found'
    })

})

app.listen(port, () => {
    console.log('server is up on port 3000.')
})