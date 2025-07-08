import Hero from "../components/sections/Hero"
import Project from "../components/sections/Project"
import Stack from "../components/sections/Stack"
import Contact from "../components/sections/Contact"

function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <Hero />
      <Stack/>
      <Project />
      <Contact />
    </section>
  )
}

export default Home