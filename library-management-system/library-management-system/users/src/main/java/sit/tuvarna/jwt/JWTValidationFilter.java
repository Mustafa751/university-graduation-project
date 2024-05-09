package sit.tuvarna.jwt;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import sit.tuvarna.models.JwtResponse;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JWTValidationFilter implements ContainerRequestFilter, ContainerResponseFilter {

    private static final String VALIDATION_URL = "http://localhost:8083/jwt/check";
    private static final String GENERATION_URL = "http://localhost:8083/jwt";

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String authHeader = requestContext.getHeaderString("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring("Bearer ".length());
            Client client = ClientBuilder.newClient();
            Response validationResponse = client.target(VALIDATION_URL)
                    .request(MediaType.APPLICATION_JSON)
                    .post(Entity.entity(token, MediaType.APPLICATION_JSON));

            if (validationResponse.getStatus() == Response.Status.OK.getStatusCode() &&
                    validationResponse.readEntity(Boolean.class)) {
                // Token is valid, request a new token
                Response newTokenResponse = client.target(GENERATION_URL)
                        .request(MediaType.APPLICATION_JSON)
                        .get();

                if (newTokenResponse.getStatus() == Response.Status.OK.getStatusCode()) {
                    String newToken = newTokenResponse.readEntity(JwtResponse.class).getJwt();
                    requestContext.setProperty("newToken", newToken); // Store new token to add in response
                }

                client.close();
                return; // Continue the request processing
            }

            client.close();
        }

        // Abort the request as the token is not valid
        requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
    }

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        // Add new token to the response header
        String newToken = (String) requestContext.getProperty("newToken");
        if (newToken != null) {
            responseContext.getHeaders().add("Authorization", "Bearer " + newToken);
        }
    }
}