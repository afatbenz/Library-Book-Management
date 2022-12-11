const booksAPI = require('../../server/api/users')

describe("GET /books", () => {
    describe("Given list of books", () => {
        test('should response 200', () => { 
            const response = request(booksAPI).get('')
        })
    })
})

// let request;
// let server
// let query;

// beforeAll((done) => {
//   Nock.disableNetConnect();
//   server = TestHelper.createTestServer(booksAPI, done);
// });

// afterAll((done) => {
//   Nock.enableNetConnect();
//   server.stop().then(() => {
//     done();
//   });
// })

// describe('P2P TOOS - Send OTP', () => {
//   beforeEach((done) => {
//     request = {
//       method: 'POST',
//       url: '/otp/send',
//       headers: defaultHeaders,
//       payload: {
//         msisdn: '6281335884729',
//         signature: 'ey3232323'
//       }
//     }
//     done()
//   })
//   test('Request OTP - Status 200', async (done)=>{
//     const msisdn = request.payload.msisdn
//     request.payload.signature = TestHelper.generateSignatureP2P(request.payload);
//     request.payload.signature = TestHelper.generateSignatureP2P(request.payload);
//     const config = Config.get(`/p2p/otp`);
//     Nock(ESB)
//     .post('/esb/v2/otp/sms/request', {
//       transaction: {
//         transaction_id: request.headers.TRANSACTIONID,
//         channel: 'i1'
//       },
//       service: {
//         service_id: msisdn
//       },
//       otp: {
//         client_id: config.clientId,
//         element1: config.clientPassword,
//         cp_name: config.cpName
//       }
//     })
//     .reply(200, MockSendOTP)
//     const response = await server.inject(request)
//     expect(response.statusCode).toBe(200)
//     done();
//   })
// })
