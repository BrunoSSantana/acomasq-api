import { Test } from "@nestjs/testing";

import { FindAssociateByIdService } from "@/domains/associate/services";
import { beforeEach, describe, expect, it } from "vitest";
import { FindByIdAssociateController } from "./find-by-id.controller";

describe("AssociateController", () => {
  let controller: FindByIdAssociateController;

  beforeEach(async () => {
    const moduleFindByIdAssociateController = await Test.createTestingModule({
      controllers: [FindByIdAssociateController],
      providers: [FindAssociateByIdService],
    }).compile();

    controller = await moduleFindByIdAssociateController.resolve(
      FindAssociateByIdService,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
