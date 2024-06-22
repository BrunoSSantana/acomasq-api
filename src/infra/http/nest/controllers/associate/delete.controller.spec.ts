import { Test } from "@nestjs/testing";

import { DeleteAssociateByIdService } from "@/domains/associate/services";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteAssociateController } from "./delete.controller";

describe("AssociateController", () => {
  let controller: DeleteAssociateController;

  beforeEach(async () => {
    const moduleDeleteAssociateController = await Test.createTestingModule({
      controllers: [DeleteAssociateController],
      providers: [DeleteAssociateByIdService],
    }).compile();

    controller = await moduleDeleteAssociateController.resolve(
      DeleteAssociateByIdService,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
