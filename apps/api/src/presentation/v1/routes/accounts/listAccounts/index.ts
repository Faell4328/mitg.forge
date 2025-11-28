import { ListAccountsContractSchema } from "@/application/usecases/account/listAccounts/contract";
import { isPermissionedProcedure } from "@/presentation/procedures/isPermissioned";

export const listAccounts = isPermissionedProcedure
	.meta({
		permission: {
			type: "ADMIN",
		},
	})
	.route({
		method: "GET",
		path: "/list-accounts",
		summary: "List the Accounts",
		successStatus: 200,
		description:
			"Retrieves a list of accounts registered on the server. Only 'ADMIN' users are allowed to perform this action.",
	})
	.input(ListAccountsContractSchema.input)
	.output(ListAccountsContractSchema.output)
	.handler(async ({ context, input }) => {
		return context.usecases.account.listAccounts.execute(input);
	});
