import z from "zod";

export const LostAccountFindByEmailOrCharacterNameContractSchema = {
	input: z.object({
		emailOrCharacterName: z.union([
			z.string().min(4, "Character name must be at least 4 characters").max(21),
			z.email("Invalid email address").max(60),
		]),
	}),
	output: z.void(),
};

export type LostAccountFindByEmailOrCharacterNameContractInput = z.infer<
	typeof LostAccountFindByEmailOrCharacterNameContractSchema.input
>;

export type LostAccountFindByEmailOrCharacterNameContractOutput = z.infer<
	typeof LostAccountFindByEmailOrCharacterNameContractSchema.output
>;
