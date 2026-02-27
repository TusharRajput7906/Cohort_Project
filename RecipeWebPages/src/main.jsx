// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer } from 'react-toastify'
import RecipeContext from './context/RecipeContext.jsx'
import ScrollToTop from "./components/ScrollToTop.jsx";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RecipeContext>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <ToastContainer />
    </BrowserRouter>
    </RecipeContext>
  /* </StrictMode> */
)
