
interface JwtConfig {
  secret: string;
  expiresIn: string | number;
}

export default (): JwtConfig => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
});
