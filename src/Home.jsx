import { Element } from 'react-scroll'
import About from './About'
import Publications from './Publications'

export default function Home() {
  return (
    <div className="pt-20">
      <Element name="home">
        <section>/* Homepage 内容（个人照片/简介） */</section>
      </Element>
      <Element name="about">
        <About/>
      </Element>
      <Element name="pubs">
        <Publications/>
      </Element>
    </div>
  )
}