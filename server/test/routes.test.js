const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

const expect = chai.expect
chai.use(chaiHttp)

const apiServer = server.app.listen(server.PORT)
const Api = () => chai.request(apiServer)

describe('unit test REST API', () => {

    before(async () => {
        console.log(`API server is listening on port ${server.PORT}`)
    })
    
    after(async () => {
        console.log('Shutting down app server');
        apiServer.close();
    })

    it('store should have products', async function () {
      const res = await Api().get(`/products/all`)
      // console.log('res >>>', res.body, '----' , res.status)
      expect(res.status).to.equal(200)
      // expect(res.body.data).to.have.property('id')
    })

    it('store should add products to cart', async function () {

    })

})