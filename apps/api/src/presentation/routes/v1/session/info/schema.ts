import z from "zod";

export const SessionInfoSchema = {
	input: z.undefined(),
	output: z.object({
		authenticated: z.boolean(),
		session: z
			.object({
				token: z.string(),
				email: z.email(),
			})
			.nullable(),
	}),
};

export type SessionInfoInput = z.infer<typeof SessionInfoSchema.input>;
export type SessionInfoOutput = z.infer<typeof SessionInfoSchema.output>;
