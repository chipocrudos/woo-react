import Img from "next/image";

/**
 * Image Component.
 * We don't need to add srcSet, as Next js will generate that.
 * @see https://nextjs.org/docs/api-reference/next/image#other-props
 * @see https://nextjs.org/docs/basic-features/image-optimization#device-sizes
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */

export const Image = (props) => {
  const {
    altText,
    title,
    width,
    height,
    sourceUrl,
    className,
    layout,
    objectFit,
    containerClassNames,
    showDefault,
    ...rest
  } = props;

  if (!sourceUrl) {
    return <Img {...attributes} />;
  }

  /**
   * If we use layout = fill then, width and height of the image cannot be used.
   * and the image fills on the entire width and the height of its parent container.
   * That's we need to wrap our image in a container and give it a height and width.
   * Notice that in this case, the given height and width is being used for container and not img.
   */
  if ("fill" === layout) {
    const attributes = {
      alt: altText || title,
      src: sourceUrl || (showDefault ? DEFAULT_IMG_URL : ""),
      layout: "fill",
      className: cx("object-cover", className),
      ...rest,
    };

    return (
      <div>
        <Img {...attributes} />
      </div>
    );
  } else {
    const attributes = {
      alt: altText || title,
      src: sourceUrl,
      width: width || "auto",
      height: height || "auto",
      className,
      ...rest,
    };
    return <Img {...attributes} />;
  }
};

Image.defaultProps = {
  altText: "",
  title: "",
  sourceUrl: "",
  showDefault: true,
  className: "product__image",
};
