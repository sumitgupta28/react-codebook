import { Hero } from './components/Hero'
import { Testimonials } from './components/Testimonials'
import { FeaturedProducts } from './components/FeaturedProducts'
import { Faq } from './components/Faq'
import { useTitle } from '../../hook/useTitle'

export const HomePage = () => {
  useTitle('Home')
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <Faq />
    </main>
  )
}
