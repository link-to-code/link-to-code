const env = {
  ADMIN_SECRET: process.env.ADMIN_SECRET,
};

export function getFromEnv(key: keyof typeof env): typeof env[keyof typeof env] {
  return env[key];
}
