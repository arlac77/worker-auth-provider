import { Router } from "itty-router";
import { error, json, missing } from "itty-router-extras";
import { createCors } from "itty-cors";

//const { preflight, corsify } = createCors();

const router = Router();

router
  //  .all("*", preflight) // handle CORS preflight/OPTIONS requests
  .get("/version", () => json({ version: "0.1.0" }))
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

/**
 * Respond to the request
 * @param {Request} request
 */
async function authorize(request) {
  return new Response({ access_token: "token" }, { status: 200 });
}
