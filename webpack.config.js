const path = require('path');

module.exports = {
    entry: './src/index.js', // indicamos punto de entrada de nuestra aplicacion
    output: {
        path: path.resolve(__dirname,'dist'), //resolve nos permite saber el directorio del proyecto. 'dist' es un standar (distribucion)
        filename: 'main.js', //nombre del archivo resultante
    },    
    resolve:{  
        extensions: ['.js'] //especificamos con que tipo de extensiones vamos a trabajar .js .jsx etc
    }
};
