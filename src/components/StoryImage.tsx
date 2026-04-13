import { ImgHTMLAttributes, useEffect, useState } from "react";

type StoryImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src"
> & {
  src: string;
  fallbackSrc?: string;
};

const StoryImage = ({
  src,
  alt,
  fallbackSrc = "/story-fallback-editorial.svg",
  ...props
}: StoryImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
};

export default StoryImage;
