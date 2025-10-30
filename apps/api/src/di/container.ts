import { container, type DependencyContainer, Lifecycle } from "tsyringe";
import { TibiaClientService } from "@/domain";
import { env } from "@/env";
import { makePrisma, type Prisma } from "@/infra/clients";
import { HasherCrypto } from "@/infra/crypto/hasher";
import { RootLogger } from "@/infra/logging/logger";
import { makeRequestLogger } from "@/infra/logging/request-logger";
import { AccountRepository, PlayersRepository } from "@/repositories";
import { TOKENS } from "./tokens";

declare global {
	var __PRISMA__: Prisma | undefined;
}

const root = new RootLogger({
	level: env.LOG_LEVEL,
	base: { service: env.SERVICE_NAME },
});

const prismaSingleton: Prisma = global.__PRISMA__ ?? makePrisma(root);

if (env.isDev) {
	global.__PRISMA__ = prismaSingleton;
}
// Global
container.registerInstance(TOKENS.RootLogger, root);
container.registerInstance(TOKENS.Prisma, prismaSingleton);

export function createRequestContainer(
	context: ReqContext,
): DependencyContainer {
	const di = container.createChildContainer();

	di.register<ReqContext>(TOKENS.ReqContext, { useValue: context });

	// Logger (scoped per request)
	const rootLogger = di.resolve<RootLogger>(TOKENS.RootLogger);
	di.registerInstance(TOKENS.Logger, makeRequestLogger(rootLogger, context));

	// Repositories
	di.register(
		TOKENS.AccountRepository,
		{ useClass: AccountRepository },
		{ lifecycle: Lifecycle.ResolutionScoped },
	);
	di.register(
		TOKENS.PlayersRepository,
		{ useClass: PlayersRepository },
		{ lifecycle: Lifecycle.ResolutionScoped },
	);

	// Crypto
	di.register(
		TOKENS.HasherCrypto,
		{ useClass: HasherCrypto },
		{ lifecycle: Lifecycle.ResolutionScoped },
	);

	// Services
	di.register(
		TOKENS.TibiaClientService,
		{ useClass: TibiaClientService },
		{ lifecycle: Lifecycle.ResolutionScoped },
	);

	return di;
}
