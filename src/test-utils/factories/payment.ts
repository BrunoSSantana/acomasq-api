import { CreatePaymentDTO } from "@/domains/payment/dto";
import { faker } from "@faker-js/faker/locale/pt_BR";

export function generatePaymentData(associateId: string): CreatePaymentDTO {
  return {
    associateId,
    month: faker.number.int({ min: 1, max: 12 }),
    year: faker.number.int({ min: 1900, max: 2100 }),
  };
}
