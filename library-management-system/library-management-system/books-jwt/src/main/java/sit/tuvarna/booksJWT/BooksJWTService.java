package sit.tuvarna.booksJWT;

import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipalFactory;
import io.smallrye.jwt.auth.principal.JWTCallerPrincipal;
import io.smallrye.jwt.auth.principal.JWTAuthContextInfo;
import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Singleton;
import sit.tuvarna.core.models.roles.Roles;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;

@Singleton
public class BooksJWTService {

    private static final Logger LOGGER = Logger.getLogger(BooksJWTService.class.getName());

    private JWTAuthContextInfo contextInfo;

    public BooksJWTService() {
        PublicKey publicKey = loadPublicKey("publicKey.pem");
        this.contextInfo = new JWTAuthContextInfo(publicKey, "books-jwt");
    }

    public BooksJWTService(PublicKey publicKey) {
        this.contextInfo = new JWTAuthContextInfo(publicKey, "books-jwt");
    }

    private PublicKey loadPublicKey(String filename) {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(filename)) {
            if (inputStream == null) {
                throw new RuntimeException("Public key file not found in classpath");
            }
            String key = new BufferedReader(new InputStreamReader(inputStream))
                    .lines()
                    .collect(Collectors.joining("\n"))
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");

            byte[] keyBytes = Base64.getDecoder().decode(key);
            X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePublic(spec);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed to load public key", e);
            throw new RuntimeException("Failed to load public key", e);
        }
    }

    public String generateJwt(String userId, String email, Roles role) {
        Set<Roles> roles = new HashSet<>();
        roles.add(role);

        return Jwt.issuer("books-jwt")
                .subject(userId)
                .groups(roles.toString())
                .claim("email", email)
                .claim("role", role)
                .issuedAt(System.currentTimeMillis())
                .sign();
    }

    public boolean checkJwtValidity(String jwtToken) {
        try {
            JWTCallerPrincipal principal = DefaultJWTCallerPrincipalFactory.instance().parse(jwtToken, contextInfo);

            if (!"books-jwt".equals(principal.getIssuer())) {
                LOGGER.warning("Invalid issuer.");
                return false;
            }

            long issuedAtTime = principal.getIssuedAtTime();
            long currentTime = System.currentTimeMillis();
            long oneHourInMilliseconds = 3600 * 1000;

            if (currentTime - issuedAtTime > oneHourInMilliseconds) {
                LOGGER.warning("Token has been valid for more than one hour and is now considered invalid.");
                return false;
            }

            return true;
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Invalid token", e);
            return false;
        }
    }

    public Map<String, Object> parseJwt(String jwtToken) {
        try {
            JWTCallerPrincipal principal = DefaultJWTCallerPrincipalFactory.instance().parse(jwtToken, contextInfo);

            String userId = principal.getName();
            String email = principal.getClaim("email");
            String role = principal.getClaim("role");

            return Map.of(
                    "userId", userId,
                    "email", email,
                    "role", role
            );
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed to parse token", e);
            return null;
        }
    }
}
