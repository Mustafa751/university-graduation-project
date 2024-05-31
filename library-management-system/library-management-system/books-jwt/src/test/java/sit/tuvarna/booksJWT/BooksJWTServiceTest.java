package sit.tuvarna.booksJWT;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import sit.tuvarna.core.models.roles.Roles;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class BooksJWTServiceTest {

    @InjectMocks
    private BooksJWTService booksJWTServiceUnderTest;

    @BeforeEach
    void setUp() {
        // Manually initialize the BooksJWTService with the public key
        PublicKey publicKey = loadPublicKey("publicKey.pem");
        booksJWTServiceUnderTest = new BooksJWTService(publicKey);
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
            throw new RuntimeException("Failed to load public key", e);
        }
    }

    @Test
    void testGenerateJwt() {
        // Run the test
        String token = booksJWTServiceUnderTest.generateJwt("userId", "email@example.com", Roles.ADMIN);

        // Verify the result
        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    @Test
    void testCheckJwtValidity() {
        // Setup: Generate a valid JWT
        String token = booksJWTServiceUnderTest.generateJwt("userId", "email@example.com", Roles.ADMIN);

        // Run the test
        boolean isValid = booksJWTServiceUnderTest.checkJwtValidity(token);

        // Verify the result
        assertTrue(isValid);
    }

    @Test
    void testCheckJwtValidity_InvalidToken() {
        // Setup: Create an invalid JWT token
        String invalidToken = "invalid.jwt.token";

        // Run the test
        boolean isValid = booksJWTServiceUnderTest.checkJwtValidity(invalidToken);

        // Verify the result
        assertFalse(isValid);
    }

    @Test
    void testParseJwt() {
        // Setup: Generate a valid JWT
        String token = booksJWTServiceUnderTest.generateJwt("userId", "email@example.com", Roles.ADMIN);

        // Run the test
        Map<String, Object> claims = booksJWTServiceUnderTest.parseJwt(token);

        // Verify the result
        assertNotNull(claims);
        assertEquals("userId", claims.get("userId"));
        assertEquals("email@example.com", claims.get("email"));
        assertEquals("ADMIN", claims.get("role"));
    }

    @Test
    void testParseJwt_InvalidToken() {
        // Setup: Create an invalid JWT token
        String invalidToken = "invalid.jwt.token";

        // Run the test
        Map<String, Object> claims = booksJWTServiceUnderTest.parseJwt(invalidToken);

        // Verify the result
        assertNull(claims);
    }
}
