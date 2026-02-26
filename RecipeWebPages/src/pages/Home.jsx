import React, { useEffect } from 'react'
import axios from '../utils/axios'
const Home = () => {
  const getProduct = async () => {
    try {
      const response = await axios.get("/products");
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      home
    </div>
  )
}

export default Home
