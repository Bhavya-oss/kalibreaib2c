import Session from "supertokens-web-js/recipe/session";
import Passwordless from "supertokens-web-js/recipe/passwordless";
import { BASE_URL } from "@/utils/HttpCommons";

export const superTokenConfig = {
  appInfo: {
    apiDomain: BASE_URL,
    apiBasePath: "/auth",
    appName: "kalibre.ai",
  },

  recipeList: [
    Passwordless.init({
      contactMethod: "EMAIL_OR_PHONE",

      preAPIHook: async (context) => {
        let action = context.action;

        if (action === "PASSWORDLESS_CONSUME_CODE") {
          let requestBody = JSON.parse(context.requestInit.body);
          let url = context.url;
          let requestInit = context.requestInit;
          (requestBody.role = "candidate"),
            (context.requestInit.body = JSON.stringify(requestBody));
          return { url, requestInit };
        } else if (action === "PASSWORDLESS_CREATE_CODE") {
          let url = context.url;
          let requestInit = context.requestInit;
          return { url, requestInit };
        } else if (action === "PASSWORDLESS_RESEND_CODE") {
          let url = context.url;
          let requestInit = context.requestInit;
          return { url, requestInit };
        }
      },
    }),
    Session.init(),
  ],
};
