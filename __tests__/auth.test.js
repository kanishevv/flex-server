// Libs
import { create } from 'apisauce';

const api = create({
  baseURL: global.host
});

describe('Auth', () => {
  const userName = '01-john.doe@app.com';
  let token;

  describe('Registr', () => {
    test('success', async () => {
      const { status, data } = await api.post('/api/auth/register', {
        username: userName,
        firstName: 'John',
        lastName: 'Doe',
        password: '123456'
      });
      expect(201).toBe(status);
      expect({ created: true }).toEqual(data);
    });

    test('re-register', async () => {
      const { status, data } = await api.post('/api/auth/register', {
        username: userName,
        firstName: 'John',
        lastName: 'Doe',
        password: '123456'
      });
      expect(500).toBe(status);
      expect({
        err: {
          code: 'ERROR_REGISTER_1',
          message: `${userName} is already registered`,
          params: { username: userName }
        }
      }).toEqual(data);
    });

    describe('failed', () => {
      test('username empty', async () => {
        const { status, data } = await api.post('/api/auth/register', {
          username: '',
          firstName: 'John',
          lastName: 'Doe',
          password: '123456'
        });
        expect(500).toBe(status);
        expect({
          err: { code: 'ERROR_AUTH_1', message: 'The username cannot be empty' }
        }).toEqual(data);
      });

      test('password empty', async () => {
        const { status, data } = await api.post('/api/auth/register', {
          username: userName,
          firstName: 'John',
          lastName: 'Doe',
          password: ''
        });
        expect(500).toBe(status);
        expect({
          err: { code: 'ERROR_AUTH_2', message: 'The password cannot be empty' }
        }).toEqual(data);
      });
    });
  });

  describe('Login', () => {
    test('success', async () => {
      const { status, data } = await api.post('/api/auth/login', {
        username: userName,
        password: '123456'
      });
      expect(200).toBe(status);
      expect(data).toHaveProperty('token');
      expect(data.token).toBeTruthy();
      token = data.token;
    });

    describe('filed', () => {
      test('username empty', async () => {
        const { status, data } = await api.post('/api/auth/login', {
          username: '',
          password: '123456'
        });
        expect(500).toBe(status);
        expect({
          err: { code: 'ERROR_AUTH_1', message: 'The username cannot be empty' }
        }).toEqual(data);
      });

      test('password empty', async () => {
        const { status, data } = await api.post('/api/auth/login', {
          username: userName,
          password: ''
        });
        expect(500).toBe(status);
        expect({
          err: { code: 'ERROR_AUTH_2', message: 'The password cannot be empty' }
        }).toEqual(data);
      });

      test('incorrect password', async () => {
        const { status, data } = await api.post('/api/auth/login', {
          username: userName,
          password: '321321'
        });
        expect(500).toBe(status);
        expect({
          err: { code: 'ERROR_LOGIN_3', message: 'Incorrect password' }
        }).toEqual(data);
      });

      test('user not found', async () => {
        const { status, data } = await api.post('/api/auth/login', {
          username: '333555-john.doe@app.com',
          password: '123456'
        });
        expect(500).toBe(status);
        expect({
          err: { code: 'ERROR_LOGIN_4', message: 'User not found' }
        }).toEqual(data);
      });
    });
  });

  describe('Recover', () => {
    test('success', async () => {
      const { status, data } = await api.post('/api/auth/recover', {
        username: userName
      });
      expect(200).toBe(status);
      expect({ sent: `Sent code to ${userName}` }).toEqual(data);
    });

    describe('filed', () => {
      test('username empty', async () => {
        const { status, data } = await api.post('/api/auth/recover', {
          username: ''
        });
        expect(500).toBe(status);
        expect({
          err: { code: 'ERROR_AUTH_1', message: 'The username cannot be empty' }
        }).toEqual(data);
      });

      test('is not registered', async () => {
        const { status, data } = await api.post('/api/auth/recover', {
          username: '144455-john.doe@app.com'
        });
        expect(500).toBe(status);
        expect({
          err: {
            code: 'ERROR_RECOVER_1',
            message: '144455-john.doe@app.com is not registered',
            params: { username: '144455-john.doe@app.com' }
          }
        }).toEqual(data);
      });
    });
  });

  describe('Me', () => {
    test('success', async () => {
      const headers = { authorization: token };
      const { status, data } = await api.get('/api/auth/me', {}, { headers });
      expect(200).toBe(status);
      expect(data).toHaveProperty('_id');
      expect(data._id).toBeTruthy();
      expect(data).toHaveProperty('created');
      expect(data._id).toBeTruthy();
      expect(data).toHaveProperty('firstName');
      expect(data.firstName).toBe('John');
      expect(data).toHaveProperty('lastName');
      expect(data.lastName).toBe('Doe');
      expect(data).toHaveProperty('email');
      expect(data.email).toBe(userName);
    });

    test('filed', async () => {
      const headers = { authorization: '' };
      const { status, data } = await api.get('/api/auth/me', {}, { headers });
      expect(401).toBe(status);
      expect(data).toEqual({ result: 'unauthorized' });
    });
  });

  // describe('Verify', () => {

  // })
});
