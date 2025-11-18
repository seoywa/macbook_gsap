import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import { ScrollTrigger , SplitText} from 'gsap/all'
import gsap from 'gsap'
import Showcase from './components/three/Showcase'

gsap.registerPlugin(ScrollTrigger);
//this line makes sure the plugin is globally accessable 

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <ProductViewer />
      <Showcase />
    </main>
  )
}

export default App