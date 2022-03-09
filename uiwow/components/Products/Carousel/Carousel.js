import { createRef, useState, useEffect } from "react";
import { Icon, Grid } from "semantic-ui-react";
import Image from "next/image";
import classNames from "classnames";
import imageWhite from "../../../public/white-image.png";

export function Carousel(props) {
  const { name, images } = props;
  const sliderRef = createRef();
  const [srcImage, setSrcImage] = useState(imageWhite);
  const [hideArrows, setHideArrows] = useState(false);

  useEffect(() => {
    if (images.length) setSrcImage(images[0].src);
    if (images.length < 6) setHideArrows(true);
  }, []);

  const onImageClick = (id) => {
    const src = images.find((image) => image.id === id).src;
    if (src) setSrcImage(src);
    else useState(imageWhite);
  };

  const onLeftClick = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  const onRightClick = () => {
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };

  return (
    <div className="carousel-product">
      <div className="carousel-product-image">
        <Image
          className="carousel-product-image-show"
          src={srcImage}
          alt={`${name}`}
          height={300}
          width={300}
        />
      </div>

      <div className="carousel-thumb">
        {images.length ? (
          <>
            <button
              className={classNames(
                "carousel-thumb-arrow",
                "carousel-thumb-left",
                {
                  "carousel-thumb-arrow-hide": hideArrows,
                }
              )}
              onClick={() => onLeftClick()}
            >
              <Icon name="angle left" />
            </button>

            <div className="carousel-thumb-posters" ref={sliderRef}>
              {images.map((image) => (
                <div
                  key={image.id}
                  className="carousel-thumb-posters-link"
                  onClick={() => onImageClick(image.id)}
                >
                  <Image
                    className="carousel-thumb-posters-image"
                    src={image.src}
                    alt={`${name} - ${image.name}`}
                    height={80}
                    width={80}
                  />
                </div>
              ))}
            </div>

            <button
              className={classNames(
                "carousel-thumb-arrow",
                "carousel-thumb-right",
                {
                  "carousel-thumb-arrow-hide": hideArrows,
                }
              )}
              onClick={() => onRightClick()}
            >
              <Icon name="angle right" />
            </button>
          </>
        ) : (
          <div>sdasdasd</div>
        )}
      </div>
    </div>
  );
}
