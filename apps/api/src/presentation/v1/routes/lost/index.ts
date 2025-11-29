import { base } from "@/infra/rpc/base";
import { findByEmailOrCharacterNameRoute } from "./findByEmailOrCharacterName";

export const lostAccountRouter = base
	.tag("Lost Account")
	.prefix("/lost")
	.router({
		findByEmailOrCharacterName: findByEmailOrCharacterNameRoute,
	});
