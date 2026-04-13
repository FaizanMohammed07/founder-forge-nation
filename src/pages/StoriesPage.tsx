import {
  ArrowRight,
  BookOpen,
  Clock3,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StoryImage from "@/components/StoryImage";
import { featuredStory, stories, storyCategories } from "@/data/stories";

const StoriesPage = () => (
  <div className="min-h-screen bg-[#f7f1eb] text-[#161113]">
    <Navbar />

    <main className="pt-[104px] md:pt-[132px]">
      <section className="relative overflow-hidden border-b border-[#eadbd4]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(229, 9, 20, 0.14), transparent 34%), radial-gradient(circle at 85% 20%, rgba(245, 158, 11, 0.16), transparent 24%), linear-gradient(180deg, #fcf6f1 0%, #f7efe8 100%)",
          }}
        />
        <div className="absolute left-[12%] top-14 h-52 w-52 rounded-full bg-white/60 blur-[100px]" />
        <div className="container relative mx-auto px-4 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E50914]/15 bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#E50914] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Founder Stories Desk
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-[#161113] md:text-6xl lg:text-7xl">
              Stories, signals, and startup momentum from builders across India.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5f5153] md:text-lg">
              A sharper editorial view into launches, capital, growth loops, and
              the operating decisions that actually move young companies
              forward.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#23161c]/10 bg-white/80 p-5 shadow-[0_18px_40px_rgba(36,18,24,0.08)] backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-[#E50914]">
                <BookOpen className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Editorial library
                </span>
              </div>
              <div className="text-3xl font-black text-[#161113]">
                {stories.length}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#5f5153]">
                Fully written founder stories with actual context, not empty
                placeholder cards.
              </p>
            </div>
            <div className="rounded-2xl border border-[#23161c]/10 bg-white/80 p-5 shadow-[0_18px_40px_rgba(36,18,24,0.08)] backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-[#E50914]">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Sector spread
                </span>
              </div>
              <div className="text-3xl font-black text-[#161113]">
                {storyCategories.length}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#5f5153]">
                Signals spanning edtech, fintech, SaaS, healthcare, climate,
                and commerce.
              </p>
            </div>
            <div className="rounded-2xl border border-[#23161c]/10 bg-white/80 p-5 shadow-[0_18px_40px_rgba(36,18,24,0.08)] backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-[#E50914]">
                <Clock3 className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Reading pace
                </span>
              </div>
              <div className="text-3xl font-black text-[#161113]">4-7 min</div>
              <p className="mt-2 text-sm leading-relaxed text-[#5f5153]">
                Built to scan fast, but detailed enough to feel like a real
                founder brief.
              </p>
            </div>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Link
              to={`/stories/${featuredStory.slug}`}
              className="group relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#2a191f]/10"
            >
              <StoryImage
                src={featuredStory.image}
                alt={featuredStory.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180f14] via-[#180f14]/58 to-transparent" />
              <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-6 text-white">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] backdrop-blur-sm">
                  Featured story
                </span>
                <span className="text-sm font-medium text-white/80">
                  {featuredStory.readTime}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="mb-4 inline-flex rounded-full bg-[#E50914] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">
                  {featuredStory.category}
                </div>
                <h2 className="max-w-3xl text-3xl font-black leading-tight text-white md:text-4xl">
                  {featuredStory.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/78">
                  {featuredStory.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-white/72">
                  <span>{featuredStory.date}</span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span>{featuredStory.metric}</span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span>{featuredStory.company}</span>
                </div>
              </div>
            </Link>

            <div className="rounded-[28px] border border-[#27171d]/10 bg-[#1a1016] p-6 text-white shadow-[0_28px_80px_rgba(25,14,19,0.22)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ff6d75]">
                    This week in motion
                  </div>
                  <h3 className="mt-2 text-2xl font-black">
                    What founders are solving right now
                  </h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <TrendingUp className="h-5 w-5 text-[#ff7d84]" />
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {featuredStory.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                      Signal
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/82">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#E50914]/20 bg-[#E50914]/10 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ff8087]">
                  Why this page exists
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/76">
                  The homepage cards now lead into a real editorial flow, so
                  visitors can actually keep reading instead of hitting a dead
                  route.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf6] py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#E50914]">
                Browse the desk
              </div>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#161113] md:text-5xl">
                Recent founder stories
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {storyCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[#e7d8d0] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6c5d5f]"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stories.map((story, index) => (
              <article
                key={story.slug}
                className={`group overflow-hidden rounded-[28px] border border-[#eadbd3] bg-white shadow-[0_16px_36px_rgba(35,17,22,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(35,17,22,0.12)] ${
                  index === 0 ? "md:col-span-2 xl:col-span-2" : ""
                }`}
              >
                <div
                  className={`grid h-full ${
                    index === 0 ? "lg:grid-cols-[1.08fr_0.92fr]" : ""
                  }`}
                >
                  <Link
                    to={`/stories/${story.slug}`}
                    className="relative min-h-[260px] overflow-hidden"
                  >
                    <StoryImage
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-[#161113]/75 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                      {story.category}
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#6a5c5e]">
                      <span>{story.date}</span>
                      <span className="h-1 w-1 rounded-full bg-[#d0bcbc]" />
                      <span>{story.readTime}</span>
                      <span className="h-1 w-1 rounded-full bg-[#d0bcbc]" />
                      <span className="font-semibold text-[#E50914]">
                        {story.metric}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black leading-tight text-[#161113] transition-colors group-hover:text-[#E50914]">
                      {story.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#5f5153] md:text-[15px]">
                      {story.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#f0e4de] pt-5">
                      <div className="min-w-0">
                        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#a28e90]">
                          Founder
                        </div>
                        <div className="mt-1 font-semibold text-[#161113]">
                          {story.founder}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-[#6a5c5e]">
                          <MapPin className="h-4 w-4" />
                          {story.location}
                        </div>
                      </div>

                      <Link
                        to={`/stories/${story.slug}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#ead6ce] px-4 py-2 text-sm font-semibold text-[#161113] transition-colors hover:border-[#E50914]/30 hover:text-[#E50914]"
                      >
                        Read story
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#1a1016] py-16 text-white md:py-20">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[0.85fr_1.15fr] md:px-8">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ff737a]">
              Founders wanted
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Want your startup featured next?
            </h2>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="max-w-2xl text-base leading-relaxed text-white/76">
              This page now has a real editorial destination. If you want it to
              feel even stronger, the next upgrade is connecting these stories
              to a CMS or founder submission workflow.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c40812]"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/survey"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Take Readiness Survey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default StoriesPage;
