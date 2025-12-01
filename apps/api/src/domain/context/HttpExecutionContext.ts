import { ORPCError } from "@orpc/client";
import { getConnInfo } from "hono/bun";
import type { ConnInfo } from "hono/conninfo";
import { inject, injectable } from "tsyringe";
import type { Cookies } from "@/domain/modules";
import { TOKENS } from "@/infra/di/tokens";
import { env } from "@/infra/env";
import type { ExecutionContext, ExecutionSource } from "./types";

@injectable()
export class HttpExecutionContext implements ExecutionContext {
	constructor(
		@inject(TOKENS.HttpContext) private readonly httpContext: HttpContext,
		@inject(TOKENS.Cookies) private readonly cookies: Cookies,
	) {}

	source(): ExecutionSource {
		return "http";
	}

	ip(): string | null {
		let info: ConnInfo | null = null;

		try {
			info = getConnInfo(this.httpContext);
		} catch {
			info = null;
		}

		const possibleIpHeaders = [
			"remoteAddress",
			"x-forwarded-for",
			"cf-connecting-ip",
			"x-real-ip",
			"fastly-client-ip",
			"true-client-ip",
			"x-client-ip",
		];

		if (info?.remote.address) {
			return info.remote.address;
		}

		return possibleIpHeaders.reduce<string | null>((foundIp, header) => {
			if (foundIp) return foundIp;
			const ip = this.httpContext.req.header(header);
			return ip ?? null;
		}, null);
	}

	userAgent(): string | null {
		return this.httpContext.req.header("user-agent") ?? null;
	}

	requestId(): string | null {
		return this.httpContext.get("requestId") ?? null;
	}

	bearer(): string | null {
		const authHeader = this.httpContext.req.header("authorization");
		if (!authHeader) return null;

		const [type, token] = authHeader.split(" ");
		if (type.toLowerCase() !== "bearer") {
			return null;
		}

		return token;
	}

	bearerFromCookies(): string | null {
		const token = this.cookies.get(env.SESSION_TOKEN_NAME, {
			namePrefix: true,
		});

		return token;
	}

	sessionOrNull(): AuthenticatedSession | null {
		const session = this.httpContext.get("session");

		if (!session) {
			return null;
		}

		return session;
	}

	session(): AuthenticatedSession {
		const session = this.httpContext.get("session");

		if (!session) {
			throw new ORPCError("UNAUTHORIZED", {
				message: "No authenticated session found",
			});
		}

		return session;
	}
}
