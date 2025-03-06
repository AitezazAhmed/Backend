const http=require('http')

const server=http.createServer((req,res)=>{
    if (req.url=="/") {
        res.end("Home Page")
        console.log(req.url)
    }


    if (req.url==="/about") {
       res.end("About Page")
       console.log(req.url)
    }


    if (req.url=="/contact") {
        res.end("Contact Page")
        console.log(req.url)
    }


    if (req.url=="/service") {
        res.end("Service Page")
        console.log(req.url)
    }
})

server.listen(3000)