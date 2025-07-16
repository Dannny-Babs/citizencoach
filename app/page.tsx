"use client"
import { StarsIcon, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">

              <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Maple_Leaf.svg/1200px-Maple_Leaf.svg.png?20190127193104" alt="CitizenCoach" width={32} height={32} />
              <h1 className="text-xl font-bold text-red-600">CitizenCoach</h1>
            </div>
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="/review" className="hover:text-gray-600 transition-colors">
                Review
              </Link>
              <Link href="/chat" className="rounded-full bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors">
                Start Quiz
              </Link>

            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="w-fit mx-auto py-1 px-4 rounded-full bg-slate-100 flex items-center gap-2">
            <StarsIcon className="w-4 h-4 text-red-600" />
            <p className="text-sm text-gray-600 font-semibold">
              Beta Launch: AI-Powered Citizenship Test Prep
            </p>

          </div>
          <div className="space-y-6">

            <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Hey <span className="text-red-600">CitizenCoach</span>,
              <br />
              <span className="text-neutral-600">Prep Me For My Citizenship</span>


            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              AI‑powered quiz coach with personalized flashcards and full‑scope test prep on Canadian history geography and civic essentials. Go into your exam ready and confident.

            </p>
          </div>


          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="bg-slate-950 border border-slate-700 hover:bg-gray-800 text-white font-medium px-6 py-3  rounded-full transition-colors text-sm"
            >
              Get started free
            </Link>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-6 py-3 rounded-full transition-colors text-sm">
              Review
            </button>
          </div>
        </div>

        {/* Visual Element Placeholder */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="w-1/3">
              <Image src="https://universitysettlement.ca/wp-content/uploads/2022/02/us_website_citizenship_840x520.jpg" alt="CitizenCoach" width={600} height={1200} className="rounded-lg object-cover h-96 w-full" />
            </div>
            <div className="w-2/3">
              <Image src="https://www.visaplace.com/wp-content/uploads/2020/01/taking-oath-1.jpg" alt="CitizenCoach" width={1200} height={1200} className="rounded-lg object-cover h-96 w-full  " />
            </div>
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <div className="w-full h-[1px] bg-gray-100" />
            <p className="text-gray-500 text-sm w-full">
              Trusted by <span className="font-semibold text-gray-700">2.3k+</span> future Canadian citizens
            </p>
            <div className="w-full h-[1px] bg-gray-100" />
          </div>

        </div>
      </main>

      {/* Features Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-4 ">
        {/* AI-Powered Coach */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 w-full flex flex-col sm:flex-row gap-4">
          <div className="mb-6  w-1/3">

            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Coach</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Get personalized questions and explanations tailored to your knowledge gaps and learning pace.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Study Session Progress</span>
                <span className="text-red-600 font-medium">8/12 complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">



          {/* Smart Flashcards */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 ">
            <div className="mb-6">
            
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Flashcards</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Automatically generate flashcards from your study sessions with spaced repetition algorithms.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-600 font-medium">Next Review</span>
                  <span className="text-xs text-gray-500">3 cards due</span>
                </div>
                <div className="text-sm text-gray-700">&ldquo;What year did Canada become a country?&rdquo;</div>
                <div className="flex space-x-2">
                  <div className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">1867</div>
                  <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">1871</div>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Coverage */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12">
            <div className="mb-6">
             
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Coverage</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Study all citizenship test topics: Canadian history, geography, government, rights and responsibilities.
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">95%</div>
                  <div className="text-xs text-gray-500">Pass Rate</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">500+</div>
                  <div className="text-xs text-gray-500">Questions</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-semibold">CitizenCoach</span>
            </div>
            <div className="flex space-x-6 text-gray-600">
              <Link href="/chat" className="hover:text-gray-900 transition-colors">
                Quiz
              </Link>
              <Link href="/review" className="hover:text-gray-900 transition-colors">
                Review
              </Link>
              <a
                href="https://github.com"
                className="hover:text-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; 2024 CitizenCoach. Built with Next.js & TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
