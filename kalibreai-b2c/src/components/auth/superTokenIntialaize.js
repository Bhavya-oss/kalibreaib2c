"use client";
import SuperTokens from "supertokens-web-js";
import { superTokenConfig } from "./superTokenConfig";

function SuperTokenInitialaize() {
  if (typeof window !== "undefined") {
    // Only initialize SuperTokens on the client side
    SuperTokens.init(superTokenConfig);
  }
  return;
}

export default SuperTokenInitialaize;
