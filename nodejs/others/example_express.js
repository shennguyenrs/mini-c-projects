const app = require('express')();
const port = 8080;

app.get('/', (req,res) => {
    res.send('Hello World');
});

const server = app.listen(port,() => {
    const host = server.address().host;
    // const port = server.address().port;
    
    console.log('Server is listening at http://%s:%s', host, port);
});
