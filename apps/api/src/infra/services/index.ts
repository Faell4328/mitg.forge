import type { DependencyContainer } from "tsyringe";
import { TOKENS } from "@/di/tokens";
import type { TibiaClientService } from "@/domain";
import type { Logger } from "@/infra/logging/logger";

export class Services {
	constructor(private readonly di: DependencyContainer) {}

	get tibiaClient() {
		return this.di.resolve<TibiaClientService>(TOKENS.TibiaClientService);
	}

	get logger() {
		return this.di.resolve<Logger>(TOKENS.Logger);
	}
}
