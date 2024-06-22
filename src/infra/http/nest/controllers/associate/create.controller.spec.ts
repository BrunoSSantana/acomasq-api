import { Test } from "@nestjs/testing";

import { CreateAssociateService } from "@/domains/associate/services";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAssociateController } from "./create.controller";

describe("AssociateController", () => {
  let controller: CreateAssociateController;

  beforeEach(async () => {
    const moduleCreateAssociateController = await Test.createTestingModule({
      controllers: [CreateAssociateController],
      providers: [CreateAssociateService],
    }).compile();

    controller = await moduleCreateAssociateController.resolve(
      CreateAssociateService,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
