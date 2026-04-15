import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv, type Plugin } from "vite";

type DevRequest = IncomingMessage & {
  body?: unknown;
  query?: Record<string, string>;
};

type DevResponse = ServerResponse<IncomingMessage> & {
  status: (code: number) => DevResponse;
  json: (payload: unknown) => DevResponse;
};

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return await new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk.toString();
    });

    req.on("end", () => {
      if (!data.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function createDevResponse(res: ServerResponse<IncomingMessage>): DevResponse {
  const devRes = res as DevResponse;

  devRes.status = (code: number) => {
    res.statusCode = code;
    return devRes;
  };

  devRes.json = (payload: unknown) => {
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(JSON.stringify(payload));
    return devRes;
  };

  return devRes;
}

function vercelApiDevBridge(): Plugin {
  const routeToModule: Record<string, string> = {
    "/api/registrations/register": "/api/registrations/register.ts",
    "/api/admin/login": "/api/admin/login.ts",
    "/api/admin/logout": "/api/admin/logout.ts",
    "/api/admin/get-registrations": "/api/admin/get-registrations.ts",
    "/api/admin/update-status": "/api/admin/update-status.ts",
    "/api/tickets/get": "/api/tickets/get.ts",
  };

  return {
    name: "vercel-api-dev-bridge",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const requestUrl = req.url || "";
        const [pathname, queryString = ""] = requestUrl.split("?");
        const modulePath = routeToModule[pathname];

        if (!modulePath) {
          next();
          return;
        }

        try {
          const apiModule = await server.ssrLoadModule(modulePath);
          const apiHandler = apiModule.default as (
            req: unknown,
            res: unknown,
          ) => Promise<void>;

          const devReq = req as DevRequest;

          if (["POST", "PUT", "PATCH"].includes((req.method || "").toUpperCase())) {
            devReq.body = await readJsonBody(req);
          }

          const searchParams = new URLSearchParams(queryString);
          devReq.query = Object.fromEntries(searchParams.entries());

          const devRes = createDevResponse(res);
          await apiHandler(devReq as never, devRes as never);

          if (!res.writableEnded) {
            res.end();
          }
        } catch (error) {
          console.error("[vite-api] Registration bridge failed", error);

          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
          }

          res.end(
            JSON.stringify({
              success: false,
              message: "Development API bridge failed",
              data: {
                reason:
                  error instanceof Error
                    ? error.message
                    : "Unknown development server error",
              },
            }),
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), vercelApiDevBridge()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
