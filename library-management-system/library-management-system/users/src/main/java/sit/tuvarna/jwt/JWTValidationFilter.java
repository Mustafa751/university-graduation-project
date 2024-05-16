package sit.tuvarna.jwt;

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
import sit.tuvarna.models.JwtResponse;

import java.lang.reflect.Method;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JWTValidationFilter implements ContainerRequestFilter, ContainerResponseFilter {

    @Context
    private ResourceInfo resourceInfo;
    private static final String VALIDATION_URL = "http://localhost:8083/jwt/check";
    private static final String GENERATION_URL = "http://localhost:8083/jwt";

    @Override
    public void filter(ContainerRequestContext requestContext) {
        Method method = resourceInfo.getResourceMethod();
        if (method.isAnnotationPresent(PermitAll.class) || resourceInfo.getResourceClass().isAnnotationPresent(PermitAll.class)) {
            return; // Skip JWT check
        }
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
        // Check if the request was for the login endpoint
        if (requestContext.getUriInfo().getPath().endsWith("/login")) {
            return; // Do nothing if it's a login request
        } else {
            // Add new token to the response header if present
            String newToken = (String) requestContext.getProperty("newToken");
            if (newToken != null) {
                responseContext.getHeaders().add("Authorization", "Bearer " + newToken);
            }
        }
    }

    private boolean hasIdProperty(Object entity) {
        try {
            Method getIdMethod = entity.getClass().getMethod("getId");
            Object id = getIdMethod.invoke(entity);
            return id != null;
        } catch (Exception e) {
            return false;
        }
    }
}
