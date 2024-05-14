
const chalk = require('chalk')

const warning = (name)=>{
    console.log(chalk.green('[System]: ') + chalk.yellow(name));
}
const error = (name)=>{
    
    console.log(chalk.green('[System]: ') + chalk.red(name))
}
const info = (name)=>{
    
    console.log(chalk.green('[System]: ') + chalk.white(name));
}


module.exports = {warning,error,info}

