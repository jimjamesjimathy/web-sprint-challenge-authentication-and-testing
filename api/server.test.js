const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

test('FOR MY SANITY!', () => {
  expect(true).toBe(true)
})

beforeAll( async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll( async () => {
  await db.destroy()
})

describe('POST /register', () => {
  test('Returns the correct user and status', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'John Diss', password: 'yellow' })
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({username: 'John Diss'})
  })

  test('Returns correct error and status when username already exists', async () => {
    const res = await request(server)
    .post('/api/auth/register')
    .send({ username: 'John Diss', password: 'yellow' })

    expect(res.status).toBe(409)
    expect(res.body.message).toBe('That name is taken, try something else!')
  })
})

describe('POST /login', () => {
  test('User can successfully log in', async() => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'John Diss', password: 'yellow' })
    expect(res.status).toBe(200)
  })

  test('returns error if credentials don\'t match', async ()=> {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'John Diss', password: 'yellowish' })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid Credentials, try again!')
  })
})

describe('GET /jokes', () => {
  test('path exists', async () => {
    const res = await request(server)
      .get('/api/jokes')
    expect(res).toBeTruthy()
  })

  test('returns error when no token', async () => {
    const res = await request(server)
      .get('/api/jokes')
    expect(res.status).toBe(401)
  })

})