import z from "zod";

export const AccountCreateContractSchema = {
	input: z
		.object({
			name: z.string().min(3).max(30).optional(),
			email: z.email(),
			password: z.string().min(8).max(100),
			confirmPassword: z.string().min(8).max(100),
		})
		.superRefine(({ confirmPassword, password }, ctx) => {
			if (confirmPassword === password) return;

			ctx.addIssue({
				code: "custom",
				message: "Password and confirm password do not match",
				path: ["confirmPassword"],
			});
		}),
	output: z.object({
		token: z.string(),
	}),
};

export type AccountCreateContractInput = z.infer<
	typeof AccountCreateContractSchema.input
>;
export type AccountCreateContractOutput = z.infer<
	typeof AccountCreateContractSchema.output
>;
