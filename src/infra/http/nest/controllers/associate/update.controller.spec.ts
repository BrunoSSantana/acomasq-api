import { Test } from "@nestjs/testing";

import { UpdateAssociateService } from "@/domains/associate/services";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateAssociateController } from "./update.controller";

describe("AssociateController", () => {
  let controller: UpdateAssociateController;

  beforeEach(async () => {
    const moduleUpdateAssociateController = await Test.createTestingModule({
      controllers: [UpdateAssociateController],
      providers: [UpdateAssociateService],
    }).compile();

    controller = await moduleUpdateAssociateController.resolve(
      UpdateAssociateService,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
