package sit.tuvarna.userpackage.jwt;

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
import org.jboss.logging.Logger;
import sit.tuvarna.core.models.JwtResponse;

import java.lang.reflect.Method;
import java.util.Map;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JWTValidationFilter implements ContainerRequestFilter, ContainerResponseFilter {

    private static final Logger LOG = Logger.getLogger(JWTValidationFilter.class);

    @Context
    private ResourceInfo resourceInfo;
    private static final String VALIDATION_URL = "http://localhost:8083/jwt/check";
    private static final String GENERATION_URL = "http://localhost:8083/jwt";
    private static final String PARSE_URL = "http://localhost:8083/jwt/parse";

    @Override
    public void filter(ContainerRequestContext requestContext) {
        Method method = resourceInfo.getResourceMethod();
        if (method.isAnnotationPresent(PermitAll.class) || resourceInfo.getResourceClass().isAnnotationPresent(PermitAll.class)) {
            return; // Skip JWT check
        }

        String authHeader = requestContext.getHeaderString("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring("Bearer ".length());

            try (Client client = ClientBuilder.newClient()) {
                Response validationResponse = client.target(VALIDATION_URL)
                        .request(MediaType.APPLICATION_JSON)
                        .post(Entity.entity(token, MediaType.APPLICATION_JSON));

                if (validationResponse.getStatus() == Response.Status.OK.getStatusCode() &&
                        validationResponse.readEntity(Boolean.class)) {
                    // Token is valid, extract user details from the token
                    handleTokenValidationSuccess(requestContext, client, token);
                    return; // Continue the request processing
                }
            } catch (Exception e) {
                LOG.error("Error validating JWT token", e);
            }
        }

        // Abort the request as the token is not valid
        requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
    }

    private void handleTokenValidationSuccess(ContainerRequestContext requestContext, Client client, String token) {
        try {
            Response userDetailsResponse = client.target(PARSE_URL)
                    .request(MediaType.APPLICATION_JSON)
                    .post(Entity.entity(token, MediaType.APPLICATION_JSON));

            if (userDetailsResponse.getStatus() == Response.Status.OK.getStatusCode()) {
                Map<String, Object> userDetails = userDetailsResponse.readEntity(Map.class);

                // Prepare query parameters for new token request
                String userId = userDetails.get("userId").toString();
                String email = userDetails.get("email").toString();
                String role = userDetails.get("role").toString();

                // Request a new token using GET request with query parameters
                Response newTokenResponse = client.target(GENERATION_URL)
                        .queryParam("userId", userId)
                        .queryParam("email", email)
                        .queryParam("role", role)
                        .request(MediaType.APPLICATION_JSON)
                        .get();

                if (newTokenResponse.getStatus() == Response.Status.OK.getStatusCode()) {
                    String newToken = newTokenResponse.readEntity(JwtResponse.class).getJwt();
                    requestContext.setProperty("newToken", newToken); // Store new token to add in response
                }
            }
        } catch (Exception e) {
            LOG.error("Error handling token validation success", e);
        }
    }

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        // Check if the request was for the login endpoint
        if (requestContext.getUriInfo().getPath().endsWith("/login")) {
            return; // Do nothing if it's a login request
        }

        // Add new token to the response header if present
        String newToken = (String) requestContext.getProperty("newToken");
        if (newToken != null) {
            responseContext.getHeaders().add("Authorization", "Bearer " + newToken);
        }
    }
}
