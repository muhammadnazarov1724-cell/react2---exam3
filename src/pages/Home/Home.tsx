import Section1H from './Section1H'
import Section2H from './Section2H'
import Section3H from './Section3H'
import Section4H from './Section4H'
import Section5H from './Section5H'
import Footer from './Footer'
import Header from '../../components/Header'

export default function Home() {
  return (
    <main>
      <Header/>
      <Section1H />
      <Section2H />
      <Section3H />
      <Section4H />
      <Section5H />
      <Footer />
    </main>
  )
}
