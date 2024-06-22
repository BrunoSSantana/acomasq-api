import { Test } from "@nestjs/testing";

import { ListAssociateService } from "@/domains/associate/services";
import { beforeEach, describe, expect, it } from "vitest";
import { FindAllAssociateController } from "./find-all.controller";

describe("AssociateController", () => {
  let controller: FindAllAssociateController;

  beforeEach(async () => {
    const moduleFindAllAssociateController = await Test.createTestingModule({
      controllers: [FindAllAssociateController],
      providers: [ListAssociateService],
    }).compile();

    controller =
      await moduleFindAllAssociateController.resolve(ListAssociateService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
