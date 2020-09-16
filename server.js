const Koa = require('koa')
const KoaRouter = require('koa-router')
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