import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import BookPageComponent from "./BookPageComponent";

function BooksPageDisplay() {
  return (
    <>
      <Navbar />
      <BookPageComponent />
      <Footer />
    </>
  );
}

export default BooksPageDisplay;
