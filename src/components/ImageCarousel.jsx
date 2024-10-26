import React, {useEffect, useRef, useState} from 'react'

/* eslint-disable react/prop-types */
const ImageCarousel = ({
  images = [],
  isLoading = false,
  imageLimit = images.length,
  customPrevButton,
  customNextButton,
  onImgClick = () => {},
  imgPerSlide = 2,
}) => {
  const imgRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0)
    }
  }, [images])

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit - 1 : prevIndex - 1,
    )
  }
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageLimit - 1 ? 0 : prevIndex + 1,
    )
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{width: imgPerSlide * imgWidth}}>
      <div
        className="image-container"
        style={{transform: `translateX(-${currentIndex * imgWidth}px)`}}
      >
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image, index) => {
            return (
              <img
                onLoad={() => setImgWidth(imgRef?.current?.offsetWidth)}
                ref={imgRef}
                key={image.id}
                src={image.url}
                onClick={() => onImgClick(image, index)}
                alt={image.title}
                className="image"
              />
            )
          })}
      </div>
      <button className="btn prev" onClick={goToPrev}>
        Prev
      </button>

      <button className="btn next" onClick={goToNext}>
        Next
      </button>
    </div>
  )
}

export default ImageCarousel
