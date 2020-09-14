const Koa = require('koa')
const KoaRouter = require('koa-router')
const app = new Koa()
const router = new KoaRouter()

const data = require('./datas/index.json')

// 使用中间件
app.use(router.routes()) // 使用路由器所有路由
	.use(router.allowedMethods()) // 使用路由器所有方法，并且解决报错状态码

// 路由
router.get('/getHomeData', function(ctx) {
	ctx.body = data // 响应数据
})

// 监听3000端口
app.listen(3000, function(err) {
	if(err) {
		console.log('服务器启动失败', err)
	}else console.log('服务器启动成功，http://localhost:3000监听中.....')
})