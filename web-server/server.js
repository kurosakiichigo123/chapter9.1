const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path'); 
const app = express();
const PORT = 3000;


const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


app.get('/search', (req, res) => {
    const { searchedText, minPrice, maxPrice } = req.query;

    
    let filteredProducts = products.filter(product => {
        return (!searchedText || product.name.toLowerCase().includes(searchedText.toLowerCase())) &&
               (!minPrice || product.price >= parseFloat(minPrice)) &&
               (!maxPrice || product.price <= parseFloat(maxPrice));
    });

    
    res.render('search', { products: filteredProducts });
});


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
