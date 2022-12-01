const fs=require('fs');

const requestHandler= (req,res) =>{
    const url=req.url;
const method =req.method;
    if(url === "/"){
        fs.readFile('message.txt',{ encoding:"utf-8" },(err,data)=>{
            if(err){
                console.log(err)
            }
        // console.log('data from file'+data)
      
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write(`<body>${data}</body>`);
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
       return res.end();
      });
      }
      else if(url === "/message" && method === 'POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
            console.log(body);
        })
      return  req.on('end',()=>{
            const parseBody= Buffer.concat(body).toString();
            console.log(parseBody);
            const message =parseBody.split('=')[1];
            fs.writeFile('message.txt',message,(err)=>{
                if(err){
                    console.log(err);
                }
                res.statusCode=302;
                res.setHeader('location','/');
                return res.end();
            });
        });
       
      
      }
      else{
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>hello from my node.js server</h1></body>');
        res.write('</html>');
        res.end()
      }
}


// module.exports=requestHandler; 1st

 // or 2nd

// module.exports={
//   handler:requestHandler,
//   someText:"hard coded text"
// }
 
// or 3rd

// exports.handler=requestHandler;
// exports.someText="hard coded text";
 
// or
module. exports.handler=requestHandler;
module. exports.someText="hard coded text";