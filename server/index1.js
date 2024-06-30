import express from 'express';
const app = express();
app.use(express.json()); // 支持一下post
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
app.use('*', (req, res,next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Credentials', 'true');  //允许携带cookie
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // content-type 允许设置为application/json
        next();
    }
)
// res接收前端传过来的信息
// res   返给前端的信息
app.post('/tacker', (req, res) => {
    // 埋点返回的信息较少
    console.log(res,'返回的信息')
    res.send('ok')
})
