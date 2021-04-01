const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    //Seccion de plugins para webpack, es un arreglo donde se definirar todos los plugines.
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body', //para que haga la insercción de los elementos puede ser true, 'body', 'head', false
            template: './public/index.html', //especificamos la ruta del template que vamos a usar
            filename: './index.html', // nombre del archivo que va a generar en dist a partir del template y las tranformaciones que realizará
        })
    ]
};
