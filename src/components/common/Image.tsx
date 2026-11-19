import { useState, type ImgHTMLAttributes } from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

const Image = ({
  src,
  alt,
  fallbackSrc,
  className = "",
  loading = "lazy",
  onError,
  ...props
}: ImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const hasFailed = Boolean(failedSrc && failedSrc === src);
  const displaySrc = hasFailed && fallbackSrc ? fallbackSrc : src;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasFailed && fallbackSrc) {
      setFailedSrc(src);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={displaySrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={`object-contain ${className}`}
      {...props}
    />
  );
};

export default Image;
