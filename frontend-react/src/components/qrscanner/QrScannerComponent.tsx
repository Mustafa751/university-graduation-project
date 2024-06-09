import { useState } from "react";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import QrScanner from "react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";

const QrScannerComponent = ({ onClose }: { onClose: () => void }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleScan = async (data: string | null) => {
    if (data) {
      setLoading(true);
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await sendRequest<Response>(
          `http://localhost:8081/api/books/scan?code=${data}`,
          requestOptions,
          navigate,
          logout
        );

        toast({
          title: "Book found",
          description: `Book details: ${response}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Handle the response data as needed
        onClose();
      } catch (error) {
        console.error("Error scanning QR code:", error);
        toast({
          title: "Error",
          description: "Failed to retrieve book information.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : (
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
        />
      )}
    </Box>
  );
};

export default QrScannerComponent;
