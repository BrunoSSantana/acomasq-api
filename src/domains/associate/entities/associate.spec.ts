import { describe, expect, test } from 'vitest';
import { Associate } from '@/domains/associate/entities/associate';

describe('ASSOCIATE - ENTITY', () => {
  test('should be able create a valid associate', () => {
    const associateProps = {
      cpf: '109.435.574-70',
      name: 'Bruno de Souza Santana',
      rg: '9138137',
    };

    const associate = Associate.create(associateProps);

    expect(associate).contains(associateProps);
  });

  test('should not be able create a associate with invalid cpf', () => {
    const associateProps = {
      cpf: '1094355747000',
      name: 'Bruno de Souza Santana',
      rg: '9.138.137',
    };

    expect(() => Associate.create(associateProps)).toThrowError(
      /^invalid CPF value: 1094355747000$/,
    );
  });

  test('should not be able create a associate with invalid rg', () => {
    const associateProps = {
      cpf: '109.435.574-70',
      name: 'Bruno de Souza Santana',
      rg: '913813X7',
    };

    expect(() => Associate.create(associateProps)).toThrowError(
      /^invalid RG value$/,
    );
  });
});
