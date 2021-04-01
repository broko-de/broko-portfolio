const path = require('path');

//Importamos plugin para HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Importamos plugin para CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Importamos plugin de copy
const CopyPlugin = require('copy-webpack-plugin');

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
            },
            //regla para agregar el loader de css
            {
                test: /\.css|.styl$/i, //expresion regular para que incluya archivos con extensión css y .styl para el preprocesador stylus
                use: [MiniCssExtractPlugin.loader,
                     'css-loader',
                     'stylus-loader'
                    ],
            },
            //regla para hacer uso de assets module
            {
                test: /\.png/, // expresion regular para incluir archivos con extension .png
                type: 'asset/resource' //
            }
        ]
    },
    //Seccion de plugins para webpack, es un arreglo donde se definirar todos los plugines.
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body', //para que haga la insercción de los elementos puede ser true, 'body', 'head', false
            template: './public/index.html', //especificamos la ruta del template que vamos a usar
            filename: './index.html', // nombre del archivo que va a generar en dist a partir del template y las tranformaciones que realizará
        }),
        new MiniCssExtractPlugin(), //instanciamos plugin de css
        new CopyPlugin({ //instanciamos plugin para copiar archivos a dist
            patterns: [
                {
                    from: path.resolve(__dirname,"src","assets/images"), //indicamos desde vamos obtener los archivos a copiar
                    //path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'); en el caso de quere incluir un archivo en particular
                    to: "assets/images", //indicamos donde le vamos a mover los archivos en la carpeta dist
                }
            ]
        })
    ]
};
