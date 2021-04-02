const path = require('path');

//Importamos plugin para HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Importamos plugin para CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Importamos plugin de copy
const CopyPlugin = require('copy-webpack-plugin');
//Importamos pluging de Dotenv
const Dotenv = require('dotenv-webpack');
//Importamos bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.js', // indicamos punto de entrada de nuestra aplicacion
    output: {
        path: path.resolve(__dirname,'dist'), //resolve nos permite saber el directorio del proyecto. 'dist' es un standar (distribucion)
        filename: '[name].[contenthash].js', //nombre del archivo resultante - se le puede agregar un hash
        assetModuleFilename: 'assets/images/[hash][ext][query]' //para que el caso de las imagenes se puedan copiar en este directorio con el nombre hasheado la misma extension
    },    
    resolve:{  
        extensions: ['.js'], //especificamos con que tipo de extensiones vamos a trabajar .js .jsx etc
        alias: { // Definicion de alias para poder usarlos en nuestros archivos js
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
        }
    },
    mode:'development', //especificamos el modo en el que estamos trabajando con estas configuraciones
    devtool: 'source-map', //Habilitamos el devtool para poder mapear nuestro codigo
    watch:true,
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
            },
            //regla para incluir las fuentas
            {
                test: /\.(woff|woff2)$/, //indicamos extensiones de las fuentes
                use:{
                    loader: 'url-loader', //cargamos el loader de las fuentes
                    options: { //agregamos opciones de configuracion
                        limit: 10000,  // Tamaño del recurso
                        mimetype: "applicaciont/font-woof", //Especificamos el tipo de archivo
                        name: "[name].[contenthash].[ext]", //para que respete el nombre del archivo y la extensión. Podriamos cambiarla si quisieramos 
                        outputPath: "./assets/fonts/", //indicamos a donde vamos a guardar los archivos en el directorio dist
                        publicPath: "../assets/fonts/", //especificamos el directorio publico sin compilaciones
                        esModule: false //avisamos explicitamente si es o no un modulo, en este caso NO.
                    }
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
        }),
        new MiniCssExtractPlugin({//instanciamos plugin de css
            filename: 'assets/[name].[contenthash].css' //agregamos el nombre del main.css sumado un hash
        }), 
        new CopyPlugin({ //instanciamos plugin para copiar archivos a dist
            patterns: [
                {
                    from: path.resolve(__dirname,"src","assets/images"), //indicamos desde vamos obtener los archivos a copiar
                    //path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'); en el caso de quere incluir un archivo en particular
                    to: "assets/images", //indicamos donde le vamos a mover los archivos en la carpeta dist
                }
            ]
        }),        
        new Dotenv(), //añadimos configuracion de dotenv
        new BundleAnalyzerPlugin(), //añadimos el bundle analyzer
    ],
    //Seccion para agregar parametros de configuracion del servidor dev para webpack
    devServer:{
        contentBase: path.join(__dirname,'dist'), //indicamos de donde se alimentara el servidor
        compress: true, //si queremos que se compriman los archivos
        historyApiFallback: true, //si necesitamos tener un historial de lo que sucede en el navegador
        port: 3005, //podemos elegir el puerto
        open: true, //para que se abra el navegador automaticamente
    }
};
