require('dotenv').config()
var Product = require('../models/product')
var mongoose = require('mongoose')



console.log(process.env)

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('database connected')
})

var products = [
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/81xvVUXum7L._SX342_.jpg',
        title: 'Final Fantasy X',
        description: 'Fantasy based RPG',
        price: 50
}),
new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/A1wqJPlgDUL._SL1500_.jpg',
    title: 'Armored Core 2',
    description: '3rd Person mecha shooter',
    price: 50
}),
new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Tony_Hawk%27s_Pro_Skater_3_Coverart.jpg/220px-Tony_Hawk%27s_Pro_Skater_3_Coverart.jpg',
    title: 'Tony Hawk Pro Skater 3',
    description: 'Skateboarding game',
    price: 50
}),
new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/510PGQN2Y0L._SY445_.jpg',
    title: 'NBA street Vol. 2',
    description: 'Basketball game',
    price: 50
}),
new Product({
    imagePath: 'https://m.media-amazon.com/images/I/71g-D5+zASL._SL1027_.jpg',
    title: 'Metal gear solid V',
    description: '1st person shooter',
    price: 50
    
})
]

var done = 0;
for(let i = 0; i< products.length; i++){
    products[i].save((err, result) => {
        done++
        if (done === products.length){
            exit()
        }
    });
}

const exit = () =>{
    console.log('added to db')
    mongoose.disconnect()
}