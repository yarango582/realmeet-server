import { SignalingController } from "../../controllers/signaling.controller";

describe("SignalingController", () => {
  let controller: SignalingController;

  beforeEach(() => {
    controller = new SignalingController();
  });

  describe("constructor", () => {
    it("should create an instance of SignalingController", () => {
      expect(controller).toBeInstanceOf(SignalingController);
    });
  });

});