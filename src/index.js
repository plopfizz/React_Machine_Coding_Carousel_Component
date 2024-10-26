import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import ImageCarousel from './components/ImageCarousel'
import './App.css'

const IMAGE_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=8'
export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState([])
  const fetchImages = async () => {
    try {
      const response = await fetch(IMAGE_URL)
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className="carousel-container">
      {isLoading ? (
        <div>Loading images....</div>
      ) : (
        <ImageCarousel
          images={images}
          //customPrev={}
          //customNext={}
          imagePerSlide={3}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
