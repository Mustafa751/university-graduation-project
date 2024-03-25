package sit.tuvarna.books;

import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Singleton;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Singleton
public class BooksJWTService {

    public String generateJwt() {
        Set<String> roles = new HashSet<>(
                Arrays.asList("writer")
        );
        return Jwt.issuer("books-jwt")
                .subject("books-jwt")
                .groups(roles)
                .expiresAt(System.currentTimeMillis() + 3600)
                .sign();
    }
}
