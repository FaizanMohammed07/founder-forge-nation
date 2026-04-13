import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MapPin,
  Quote,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StoryImage from "@/components/StoryImage";
import { getStoryBySlug, stories } from "@/data/stories";

const StoryDetailPage = () => {
  const { slug } = useParams();
  const story = getStoryBySlug(slug);

  if (!story) {
    return (
      <div className="min-h-screen bg-[#faf5ef] text-[#161113]">
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-4 pt-[104px] md:px-8 md:pt-[132px]">
          <div className="max-w-2xl rounded-[28px] border border-[#ead9d1] bg-white p-8 text-center shadow-[0_24px_60px_rgba(36,18,24,0.08)] md:p-12">
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E50914]/10 text-[#E50914]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              This story does not exist yet.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#5f5153]">
              The broken link issue is fixed, but this particular article slug
              is not in the story library. You can head back to the stories hub
              and open any live article from there.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 rounded-full bg-[#161113] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a1a21]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to stories
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-[#ead9d1] px-6 py-3 text-sm font-semibold text-[#161113] transition-colors hover:border-[#E50914]/30 hover:text-[#E50914]"
              >
                Return home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedStories = stories
    .filter((candidate) => candidate.slug !== story.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fcf7f2] text-[#161113]">
      <Navbar />

      <main className="pt-[104px] md:pt-[132px]">
        <article>
          <section className="relative overflow-hidden border-b border-[#eadbd4]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 15% 10%, rgba(229, 9, 20, 0.12), transparent 28%), radial-gradient(circle at 80% 15%, rgba(245, 158, 11, 0.12), transparent 22%), linear-gradient(180deg, #fff8f4 0%, #f7eee7 100%)",
              }}
            />
            <div className="container relative mx-auto grid gap-8 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <Link
                  to="/stories"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f5153] transition-colors hover:text-[#E50914]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to stories
                </Link>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#E50914] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">
                    {story.category}
                  </span>
                  <span className="text-sm font-medium text-[#6b5c5e]">
                    {story.date}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#cfbbbb]" />
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6b5c5e]">
                    <Clock3 className="h-4 w-4" />
                    {story.readTime}
                  </span>
                </div>

                <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight text-[#161113] md:text-6xl">
                  {story.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5f5153] md:text-lg">
                  {story.excerpt}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#5f5153]">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#a28e90]">
                      Founder
                    </div>
                    <div className="mt-1 font-semibold text-[#161113]">
                      {story.founder}
                    </div>
                  </div>
                  <span className="hidden h-10 w-px bg-[#eadbd4] md:block" />
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#a28e90]">
                      Company
                    </div>
                    <div className="mt-1 font-semibold text-[#161113]">
                      {story.company}
                    </div>
                  </div>
                  <span className="hidden h-10 w-px bg-[#eadbd4] md:block" />
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#a28e90]">
                      Location
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1.5 font-semibold text-[#161113]">
                      <MapPin className="h-4 w-4 text-[#E50914]" />
                      {story.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[32px] border border-[#2b1a20]/10 shadow-[0_30px_80px_rgba(36,18,24,0.16)]">
                <StoryImage
                  src={story.image}
                  alt={story.title}
                  className="h-[360px] w-full object-cover md:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1016]/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/70">
                    {story.kicker}
                  </div>
                  <div className="mt-2 text-2xl font-black md:text-3xl">
                    {story.metric}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="container mx-auto grid gap-10 px-4 md:px-8 lg:grid-cols-[0.72fr_0.28fr]">
              <div>
                <div className="rounded-[28px] border border-[#eadbd4] bg-white p-6 shadow-[0_18px_40px_rgba(36,18,24,0.06)] md:p-8">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#161113] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                    <Quote className="h-4 w-4 text-[#ff747b]" />
                    Founder quote
                  </div>
                  <p className="text-2xl font-black leading-tight tracking-tight text-[#161113] md:text-3xl">
                    "{story.quote}"
                  </p>
                </div>

                <div className="mt-10 space-y-12">
                  {story.sections.map((section) => (
                    <section key={section.title}>
                      <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#E50914]">
                        Story section
                      </div>
                      <h2 className="mt-3 text-3xl font-black tracking-tight text-[#161113]">
                        {section.title}
                      </h2>
                      <div className="mt-5 space-y-5">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-[15px] leading-8 text-[#4f4345] md:text-lg"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[28px] border border-[#26171d]/10 bg-[#1a1016] p-6 text-white shadow-[0_24px_70px_rgba(25,14,19,0.18)]">
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ff737a]">
                    Key takeaways
                  </div>
                  <div className="mt-6 space-y-4">
                    {story.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/42">
                          Insight
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-white/80">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-[28px] border border-[#eadbd4] bg-white p-6 shadow-[0_18px_40px_rgba(36,18,24,0.06)]">
                  <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#E50914]">
                    Keep reading
                  </div>
                  <div className="mt-4 space-y-4">
                    {relatedStories.slice(0, 2).map((relatedStory) => (
                      <Link
                        key={relatedStory.slug}
                        to={`/stories/${relatedStory.slug}`}
                        className="block rounded-2xl border border-[#f0e3dc] p-4 transition-colors hover:border-[#E50914]/25"
                      >
                        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9f8a8d]">
                          {relatedStory.category}
                        </div>
                        <div className="mt-2 font-bold leading-snug text-[#161113]">
                          {relatedStory.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </article>

        <section className="border-t border-[#ebdcd4] bg-[#fffaf6] py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#E50914]">
                  More from the desk
                </div>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#161113] md:text-5xl">
                  Related stories
                </h2>
              </div>
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#161113] transition-colors hover:text-[#E50914]"
              >
                Browse all stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedStories.map((relatedStory) => (
                <article
                  key={relatedStory.slug}
                  className="overflow-hidden rounded-[26px] border border-[#eadbd4] bg-white shadow-[0_18px_40px_rgba(36,18,24,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(36,18,24,0.10)]"
                >
                  <Link
                    to={`/stories/${relatedStory.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden"
                  >
                    <StoryImage
                      src={relatedStory.image}
                      alt={relatedStory.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-[#161113]/78 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                      {relatedStory.category}
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="text-sm text-[#6b5c5e]">
                      {relatedStory.date}
                    </div>
                    <h3 className="mt-3 text-xl font-black leading-snug text-[#161113]">
                      {relatedStory.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5f5153]">
                      {relatedStory.excerpt}
                    </p>
                    <Link
                      to={`/stories/${relatedStory.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#E50914]"
                    >
                      Read story
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StoryDetailPage;
