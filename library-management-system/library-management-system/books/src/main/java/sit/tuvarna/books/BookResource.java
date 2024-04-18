package sit.tuvarna.books;


import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@Path("/api/books")
@ApplicationScoped
public class BookResource {
    List<Book> books = new ArrayList<>();

    @POST
    @RolesAllowed({"admin","writer"})
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(Book book){
        books.add(book);
        return Response.ok(books).build();
    }

    @Path("{id}")
    @RolesAllowed("admin")
    @DELETE
    public Response deleteBook(@PathParam("id")  Long id){
        books.removeIf(book -> book.id.equals(id));
        return Response.ok(books).build();
    }
}
