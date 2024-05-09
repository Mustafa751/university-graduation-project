package sit.tuvarna.books;

import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipalFactory;
import io.smallrye.jwt.auth.principal.JWTAuthContextInfo;
import io.smallrye.jwt.auth.principal.JWTCallerPrincipal;
import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Singleton;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Singleton
public class BooksJWTService {


    private JWTAuthContextInfo contextInfo = new JWTAuthContextInfo("/publicKey.pem","books-jwt");
    public String generateJwt() {
        Set<String> roles = new HashSet<>(
                Arrays.asList("writer", "admin")
        );
        return Jwt.issuer("books-jwt")
                .subject("books-jwt")
                .groups(roles)
                .issuedAt(System.currentTimeMillis())
                .sign();
    }

    public boolean checkJwtValidity(String jwtToken) {
        try {
            // Parse the JWT token
            JWTCallerPrincipal principal = DefaultJWTCallerPrincipalFactory.instance().parse(jwtToken, contextInfo);

            // Check the issuer
            if (!"books-jwt".equals(principal.getIssuer())) {
                System.out.println("Invalid issuer.");
                return false;
            }

            // Check if the token is expired
            long issuedAtTime = principal.getIssuedAtTime();
            long currentTime = System.currentTimeMillis();
            long oneHourInMilliseconds = 3600 * 1000;

            // Check if more than one hour has passed since the token was issued
            if (currentTime - issuedAtTime > oneHourInMilliseconds) {
                System.out.println("Token has been valid for more than one hour and is now considered invalid.");
                return false;
            }

            return true;
        } catch (Exception e) {
            System.out.println("Invalid token: " + e.getMessage());
            return false;
        }
    }
}
