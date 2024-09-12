import request from 'supertest';
import app from '../app';

describe('Index endpoint', () => {
  it('should respond status OK (200)', async () => {
    const res = await request(app)
    .get('/')
    .send()

    expect(res.statusCode).toEqual(200)
  })
})

describe('Login endpoint', () => {
    it('should respond status OK (200) and give us a token', async () => {
      const res = await request(app)
      .post('/login')
      .send({
        username: 'admin',
        password: 'admin'
      })
  
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
    })

    it('test invalid data', async () => {
        const res = await request(app)
        .post('/login')
        .send({
          username: 'admin',
          password: 'potato'
        })
    
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('errors')
      })


      it('should allow us to see bookings', async () => {
        const res = await request(app)
        .post('/login')
        .send({
          username: 'admin',
          password: 'admin'
        })
    
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')

        const res2 = await request(app)
        .get('/bookings')
        .set('Authorization', 'bearer ' + res.body.token)
        .send()


        expect(res2.statusCode).toEqual(200)
        expect(res2.body).toBeDefined()
      })
  })

  describe('User endpoint', () => {
    it('should respond unauthorized (401)', async () => {
      const res = await request(app)
      .get('/bookings')
      .send()
  
      expect(res.statusCode).toEqual(401)
    })
  })