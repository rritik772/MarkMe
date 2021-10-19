import { Link } from "react-router-dom";

export default function AboutMe(){
  return (
    <>
      <main className="space-y-5 md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-sky-200 md:border-4 border-sky-500 shadow-lg">
        <div>
          <span className="text-3xl">Ritik Ranjan</span>
        </div>
        <div className="space-y-5 text-lg">
          <div>
            <p>I am a computer science student.</p>
            <p>I am currently in my 3<sup>rd</sup> year of my studies(2021).</p>
            <p>I love to program in <code>Python</code>, <code>Java</code>, <code>Javascript</code>, <code>Rust</code>, <code>Kotlin</code></p>
          </div>
          <div className="flex space-x-10 justify-center">
            <a href="https://github.com/rritik772" className="flex space-x-2 items-center hover:underline" >
              <span className="font-plex-sans-medium">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/ritik-ranjan-903461166/" className="flex space-x-2 items-center hover:underline" >
              <span className="font-plex-sans-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
