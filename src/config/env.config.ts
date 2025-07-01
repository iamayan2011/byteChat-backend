export const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || "5001",
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
} as const;

// Validate all environment variables are present at startup
export function validateEnv() {
  const requiredEnvs: (keyof typeof env)[] = Object.keys(
    env
  ) as (keyof typeof env)[];
  const missingEnvs = requiredEnvs.filter((key) => !process.env[key]);

  if (missingEnvs.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvs.join(", ")}`
    );
  }
}
