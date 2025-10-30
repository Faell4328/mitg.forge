import { inject, injectable } from "tsyringe";
import { TOKENS } from "@/di/tokens";
import type { Prisma } from "@/infra/clients";

@injectable()
export class PlayersRepository {
	constructor(@inject(TOKENS.Prisma) private readonly prisma: Prisma) {}

	async byAccountId(accountId: number) {
		return this.prisma.players.findMany({
			where: {
				account_id: accountId,
			},
			orderBy: {
				name: "asc",
			},
		});
	}
}
