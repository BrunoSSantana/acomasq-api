import { randomUUID } from 'node:crypto';
import { describe, expect, test } from 'vitest';
import { Payment } from './payment';

describe('PAYMENT - RNTITY', () => {
  test('should be able create a valid payment', () => {
    const paymnetProps = {
      id: randomUUID(),
      mes: 1,
      ano: 1900,
      associateId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const payment = Payment.create(paymnetProps);

    expect(payment).contains(paymnetProps);
  });

  test('should not be able create a valid payment with a invalid month', () => {
    const paymnetProps = {
      id: randomUUID(),
      mes: 0,
      ano: 2000,
      associateId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });

  test('should not be able create a valid payment with a invalid year', () => {
    const paymnetProps = {
      id: randomUUID(),
      mes: 1,
      ano: 0,
      associateId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });

  test('should not be able create a valid payment with a invalid uuid on associateId', () => {
    const paymnetProps = {
      id: 'uuid-invalid',
      mes: 1,
      ano: 2000,
      associateId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });

  test('should not be able create a valid payment with a invalid uuid on payment id', () => {
    const paymnetProps = {
      id: randomUUID(),
      mes: 1,
      ano: 2000,
      associateId: 'invalid-uuid',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });
});
