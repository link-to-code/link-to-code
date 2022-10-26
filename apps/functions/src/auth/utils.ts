const extractTokenFromHeader = (authHeader: string) => {
  return authHeader.match(/Bearer\s+(.+)/)?.[1];
};

const decodeBearerToken = (token: string) => {
  return Buffer.from(token, "base64").toString();
};

export { extractTokenFromHeader, decodeBearerToken };
