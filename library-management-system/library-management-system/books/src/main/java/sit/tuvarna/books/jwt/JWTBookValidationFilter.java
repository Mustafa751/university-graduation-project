package sit.tuvarna.books.jwt;

import jakarta.annotation.Priority;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.container.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import sit.tuvarna.core.models.JwtResponse;

import java.lang.reflect.Method;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JWTBookValidationFilter implements ContainerRequestFilter, ContainerResponseFilter {

    private static final Logger LOGGER = Logger.getLogger(JWTBookValidationFilter.class.getName());

    @Context
    private ResourceInfo resourceInfo;

    private static final String VALIDATION_URL = System.getenv("VALIDATION_URL") != null ? System.getenv("VALIDATION_URL") : "http://localhost:8083/jwt/check";
    private static final String GENERATION_URL = System.getenv("GENERATION_URL") != null ? System.getenv("GENERATION_URL") : "http://localhost:8083/jwt";
    private static final String PARSE_URL = System.getenv("PARSE_URL") != null ? System.getenv("PARSE_URL") : "http://localhost:8083/jwt/parse";

    @Override
    public void filter(ContainerRequestContext requestContext) {
        Method method = resourceInfo.getResourceMethod();
        if (isPermitAll(method)) {
            return;
        }

        String authHeader = requestContext.getHeaderString("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            abortRequest(requestContext, Response.Status.UNAUTHORIZED);
            return;
        }

        String token = authHeader.substring("Bearer ".length());
        try (Client client = ClientBuilder.newClient()) {
            if (!isTokenValid(client, token)) {
                abortRequest(requestContext, Response.Status.UNAUTHORIZED);
                return;
            }

            Map<String, Object> userDetails = parseToken(client, token);
            if (userDetails == null) {
                abortRequest(requestContext, Response.Status.UNAUTHORIZED);
                return;
            }

            String newToken = requestNewToken(client, userDetails);
            if (newToken != null) {
                requestContext.setProperty("newToken", newToken);
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error during token validation", e);
            abortRequest(requestContext, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean isPermitAll(Method method) {
        return method.isAnnotationPresent(PermitAll.class) || resourceInfo.getResourceClass().isAnnotationPresent(PermitAll.class);
    }

    private boolean isTokenValid(Client client, String token) {
        Response response = client.target(VALIDATION_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(token, MediaType.APPLICATION_JSON));
        return response.getStatus() == Response.Status.OK.getStatusCode() && response.readEntity(Boolean.class);
    }

    private Map<String, Object> parseToken(Client client, String token) {
        Response response = client.target(PARSE_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(token, MediaType.APPLICATION_JSON));
        if (response.getStatus() != Response.Status.OK.getStatusCode()) {
            return null;
        }
        return response.readEntity(Map.class);
    }

    private String requestNewToken(Client client, Map<String, Object> userDetails) {
        String userId = userDetails.get("userId").toString();
        String email = userDetails.get("email").toString();
        String role = userDetails.get("role").toString();

        Response response = client.target(GENERATION_URL)
                .queryParam("userId", userId)
                .queryParam("email", email)
                .queryParam("role", role)
                .request(MediaType.APPLICATION_JSON)
                .get();
        if (response.getStatus() != Response.Status.OK.getStatusCode()) {
            return null;
        }
        return response.readEntity(JwtResponse.class).getJwt();
    }

    private void abortRequest(ContainerRequestContext requestContext, Response.Status status) {
        requestContext.abortWith(Response.status(status).build());
    }

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        if (requestContext.getUriInfo().getPath().endsWith("/login")) {
            return;
        }

        String newToken = (String) requestContext.getProperty("newToken");
        if (newToken != null) {
            responseContext.getHeaders().add("Authorization", "Bearer " + newToken);
        }
    }
}
