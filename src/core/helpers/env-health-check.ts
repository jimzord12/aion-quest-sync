type EnvVariable = {
	key: EnvVarsKeys;
	valueType: "string" | "boolean" | "number";
	isRequired: boolean;
};

type EnvVarsKeys = (typeof requiredEnvVars)[number];

interface EnvHealthCheckResult {
	missingEnvVars: EnvVarsKeys[];
	isHealthy: boolean;
	envVars: Record<EnvVarsKeys, string>;
}

const requiredEnvVars = [
	"POSTGRES_USER",
	"POSTGRES_PASSWORD",
	"POSTGRES_DB",
	"DATABASE_URL",
	"PGADMIN_DEFAULT_EMAIL",
	"PGADMIN_DEFAULT_PASSWORD",
] as const;

const envConfig: EnvVariable[] = [
	{ key: "POSTGRES_USER", valueType: "string", isRequired: true },
	{ key: "POSTGRES_PASSWORD", valueType: "string", isRequired: true },
	{ key: "POSTGRES_DB", valueType: "string", isRequired: true },
	{ key: "DATABASE_URL", valueType: "string", isRequired: true },
	{ key: "PGADMIN_DEFAULT_EMAIL", valueType: "string", isRequired: true },
	{ key: "PGADMIN_DEFAULT_PASSWORD", valueType: "string", isRequired: true },
];

export const envHealthCheck = (): EnvHealthCheckResult => {
	const missingEnvVars: EnvVarsKeys[] = envConfig
		.filter((envVar) => envVar.isRequired && !process.env[envVar.key])
		.map((envVar) => envVar.key);

	const isHealthy = missingEnvVars.length === 0;

	const envVars: Record<EnvVarsKeys, string> = envConfig.reduce(
		(acc, envVar) => {
			const envValue = process.env[envVar.key];
			if (!envValue) return acc;
			acc[envVar.key] = envValue;
			return acc;
		},
		{} as Record<EnvVarsKeys, string>,
	);

	return { missingEnvVars, isHealthy, envVars };
};
