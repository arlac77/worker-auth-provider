import { Router } from "itty-router";
import { error, json, missing } from "itty-router-extras";
import { createCors } from "itty-cors";
import { authorize } from "./authorize.mjs";

const { preflight, corsify } = createCors({ allowOrigin: "*" });

const router = Router();


router
  .all("*", preflight)
  .get("/version", () => json({ version: "0.5.0" }))
  .post("/", authorize)
  .all("*", () => missing("Are you sure about that?"));

export default {
  fetch(...args) {
    return router
      .handle(...args)
      .catch(err => error(500, err.stack))
      .then(corsify);
  }
};
