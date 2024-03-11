/* eslint-disable @next/next/no-img-element */

interface imageProps {
  src: string;
  alt: string;
}

const Image: React.FC<imageProps> = ({ src, alt }) => {
  return (
    <div className="flip-card-front rounded-md flex flex-col">
      <img
        src={src}
        alt={alt}
        className="rounded-md bg-cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Image;
