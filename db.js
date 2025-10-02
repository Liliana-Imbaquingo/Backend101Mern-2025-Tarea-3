const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Liliana:Marina0610@cluster0.wqzhnkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0') 
.then(() => console.log('✅ Conectado a MongoDB')) 
.catch(err => console.error('❌ Error de conexión:', err));

module.exports = mongoose;