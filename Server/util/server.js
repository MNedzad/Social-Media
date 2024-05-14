var http = require('http');

http.createServer(function(request, response){
    http.request(options, res =>{
        let data = ""
        res.on("data", d =>{
            data += d;
        })
        res.on("end", ()=>{
            console.log(data);
        })
    })
    
}).listen(8080);