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
  return {
    name: "vercel-api-dev-bridge",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || "").split("?")[0];

        if (pathname !== "/api/registrations/register") {
          next();
          return;
        }

        try {
          const registrationModule = await server.ssrLoadModule(
            "/api/registrations/register.ts",
          );
          const registerHandler = registrationModule.default as (
            req: unknown,
            res: unknown,
          ) => Promise<void>;

          const body = await readJsonBody(req);
          const devReq = req as DevRequest;
          devReq.body = body;
          devReq.query = {};

          const devRes = createDevResponse(res);
          await registerHandler(devReq as never, devRes as never);

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
