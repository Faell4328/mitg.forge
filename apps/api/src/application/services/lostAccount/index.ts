import { ORPCError } from "@orpc/client";
import { inject, injectable } from "tsyringe";
import { Catch } from "@/application/decorators/Catch";
import type { AccountRepository } from "@/domain/repositories";
import { TOKENS } from "@/infra/di/tokens";

@injectable()
export class LostAccountService {
	constructor(
		@inject(TOKENS.AccountRepository)
		private readonly accountRepository: AccountRepository,
	) {}

	private async accountExistis(emailOrCharacterName: string) {
		const account =
			(await this.accountRepository.findByEmail(emailOrCharacterName)) ??
			(await this.accountRepository.findByCharacterName(emailOrCharacterName));

		return account;
	}

	@Catch()
	async findByEmailOrPlayerName(identifier: string) {
		const account = await this.accountExistis(identifier);

		if (!account) {
			throw new ORPCError("NOT_FOUND", {
				message: "No records found for the provided value.",
			});
		}
	}
}
