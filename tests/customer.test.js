const expect = require('expect');
const request = require('supertest');
const { CleanCustomerModel } = require('./common/customer')

const { CUSTOMER_SIGNUP_SUCCESS } = require('./common/variable')

const app = require('./../app');

const CustomerModel = require('../models/customer');

beforeEach(CleanCustomerModel)

describe('POST /customer/register', () => {
    it('should register a customer', (done) => {

        request(app)
            .post('/customer/register')
            .send(CUSTOMER_SIGNUP_SUCCESS)
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(CUSTOMER_SIGNUP_SUCCESS.email);
                expect(res.body.mobileNumber).toBe(CUSTOMER_SIGNUP_SUCCESS.mobileNumber);
            })
            .end((err, res) => {
                done()
            });
    });

    it('should fail if the email or mobileNumber matches', (done) => {

        request(app)
            .post('/customer/register')
            .send(CUSTOMER_SIGNUP_SUCCESS)
            .expect(400)
            .end((err, res) => {
                done()
            });
    });

})