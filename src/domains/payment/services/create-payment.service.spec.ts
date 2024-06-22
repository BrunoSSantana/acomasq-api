import { afterEach, describe, expect, it, vi } from "vitest";

import { randomUUID } from "crypto";
import { CreatePaymentDTO } from "@/domains/payment/dto"; // Replace with your paths
import { Payment } from "@/domains/payment/entities"; // Replace with your paths
import { IPaymentRepositoryPort } from "@/domains/payment/repositories"; // Replace with your paths
import { InMemoryPaymentRepository } from "@/infra/repositories/in-memory";
import { CreatePaymentService } from "./create-payment.service"; // Replace with your service path

describe("CreatePaymentService", () => {
  let service: CreatePaymentService;
  let mockRepository: IPaymentRepositoryPort;
  let associateId: string;

  beforeEach(() => {
    mockRepository = new InMemoryPaymentRepository();

    service = new CreatePaymentService(mockRepository);
    associateId = randomUUID();
  });

  it("should create a payment successfully", async () => {
    // Arrange
    vi.setSystemTime(new Date());

    const createPaymentDto: CreatePaymentDTO = {
      month: 1,
      associateId,
      year: 2024,
    };

    vi.spyOn(mockRepository, "create");

    // Act
    await service.execute(createPaymentDto);

    // Assert
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });
});
