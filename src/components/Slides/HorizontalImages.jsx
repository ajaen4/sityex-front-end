import { useEffect, useState } from "react";

const HorizontalImages = (images) => {
  const [horizontalImages, setHorizontalImages] = useState([]);

  useEffect(() => {
    const checkOrientation = async () => {
      const promises = images.map(
        (image) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              if (img.width > img.height) {
                resolve(image);
              } else {
                resolve(null);
              }
            };
            img.src = image.sizes["640x480"].link;
          }),
      );

      const results = await Promise.all(promises);
      setHorizontalImages(results.filter((image) => image !== null));
    };

    checkOrientation();
  }, [images]);

  return horizontalImages;
};

export default HorizontalImages;
