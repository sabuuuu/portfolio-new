import Hero from "../components/sections/Hero"
import Project from "../components/sections/Project"
import Stack from "../components/sections/Stack"
import Contact from "../components/sections/Contact"
import WhatIUse from "../components/sections/WhatIUse"

function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <Hero />
      <Stack/>
      <WhatIUse />
      <Project />
      <Contact />
    </section>
  )
}

export default Home