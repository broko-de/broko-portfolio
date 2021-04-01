const path = require('path');

module.exports = {
    entry: './src/index.js', // indicamos punto de entrada de nuestra aplicacion
    output: {
        path: path.resolve(__dirname,'dist'), //resolve nos permite saber el directorio del proyecto. 'dist' es un standar (distribucion)
        filename: 'main.js', //nombre del archivo resultante
    },    
    resolve:{  
        extensions: ['.js'] //especificamos con que tipo de extensiones vamos a trabajar .js .jsx etc
    },
    //difinimos un modulo que es un objeto
    module:{ 
        //intermanete usa rules para establecer como vamos a trabajar con distintos tipos de archivos o elementos dentro del proyecto
        rules:[
            //Indicamos en webpack que usaremos babel
            {
                test: /\.m?js$/, //expresion regular que indica que utilice cualquier extensión .js o mjs
                exclude: /node_modules/, //para indicarle que no use nada de la carpeta node_module
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
};
