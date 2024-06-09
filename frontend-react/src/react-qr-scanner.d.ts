declare module 'react-qr-scanner' {
    import { ComponentType } from 'react';
  
    interface QrScannerProps {
      delay?: number;
      onError?: (error: Error) => void;
      onScan?: (data: string | null) => void;
      style?: React.CSSProperties;
      className?: string;
      facingMode?: 'user' | 'environment';
      legacyMode?: boolean;
      maxImageSize?: number;
      resolution?: number | string;
      showViewFinder?: boolean;
      constraints?: MediaTrackConstraints;
    }
  
    const QrScanner: ComponentType<QrScannerProps>;
  
    export default QrScanner;
  }
  