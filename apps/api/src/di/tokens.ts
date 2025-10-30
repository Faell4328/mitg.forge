export const TOKENS = {
	// context
	ReqContext: Symbol("ReqContext"),

	// Logger
	Logger: Symbol("Logger"),
	RootLogger: Symbol("RootLogger"),

	// Clients
	Prisma: Symbol("Prisma"),
	HasherCrypto: Symbol("HasherCrypto"),

	// Repositories
	AccountRepository: Symbol("AccountRepository"),
	PlayersRepository: Symbol("PlayersRepository"),

	// services
	TibiaClientService: Symbol("TibiaClientService"),
} as const;
