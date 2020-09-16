const Koa = require('koa')
const KoaRouter = require('koa-router')
// Node 入口
const Fly=require("flyio/src/node")
const fly=new Fly;
const jwt = require('jsonwebtoken');
const app = new Koa()
const router = new KoaRouter()

const homeData = require('./datas/index.json')
const categoryData = require('./datas/categoryDatas.json')
const buyingData = require('./datas/buying.json')
const cateList = require('./datas/indexCateList.json')
const goodsList = require('./datas/goods.json')

// 使用中间件
app.use(router.routes()) // 使用路由器所有路由
	.use(router.allowedMethods()) // 使用路由器所有方法，并且解决报错状态码

// 路由
router.get('/getHomeData', function(ctx) {
	ctx.body = homeData // 响应数据
})

router.get('/getCategoryList', function(ctx) {
	ctx.body = categoryData
})

router.get('/getBuyingData', function(ctx) {
	ctx.body = buyingData
})

router.get('/getindexCateList', async function(ctx) {
	await new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve()
		},2000)
	})
	ctx.body={
		code:200,
		data:cateList
	};
})

// 获取openid
router.get('/getOpenId', async function(ctx) {
	const {code} = ctx.query
	const appId = 'wxd0d785600cb4dd94'
	const secret = '879452b6c462d59f606911a976f97cc9'
	const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
	
	const res = await fly.get(url)
	const {openid} = JSON.parse(res.data)
	const salt = 'JTRNL'
	// 加密
	const openidSign = jwt.sign(openid, salt)
	// 解密
	const openidVerify = jwt.verify(openid, salt)
	
	ctx.body = openidSign
})

router.get('/getGoodsById', function(ctx) {
	const {id} = ctx.query
	ctx.body = goodsList.find(item => item.id === parseInt(id))
})

// 监听3000端口
app.listen(3000, function(err) {
	if(err) {
		console.log('服务器启动失败', err)
	}else console.log('服务器启动成功，http://localhost:3000监听中.....')
})