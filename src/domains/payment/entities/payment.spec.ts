import { randomUUID } from 'node:crypto';
import { describe, expect, test } from 'vitest';
import { Payment } from '@/domains/payment/entities';

describe('PAYMENT - RNTITY', () => {
  test('should be able create a valid payment', () => {
    const paymnetProps = {
      id: randomUUID(),
      month: 1,
      year: 1900,
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
      month: 0,
      year: 2000,
      associateId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });

  test('should not be able create a valid payment with a invalid year', () => {
    const paymnetProps = {
      id: randomUUID(),
      month: 1,
      year: 0,
      associateId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });

  test('should not be able create a valid payment with a invalid uuid on associateId', () => {
    const paymnetProps = {
      id: 'uuid-invalid',
      month: 1,
      year: 2000,
      associateId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });

  test('should not be able create a valid payment with a invalid uuid on payment id', () => {
    const paymnetProps = {
      id: randomUUID(),
      month: 1,
      year: 2000,
      associateId: 'invalid-uuid',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });

  test('should not be able create a payment with year less than 1900', () => {
    const paymnetProps = {
      id: randomUUID(),
      month: 1,
      year: 1899,
      associateId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => Payment.create(paymnetProps)).toThrowError();
  });
});
