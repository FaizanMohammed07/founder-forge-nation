import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StoryImage from "@/components/StoryImage";
import { homepageStories } from "@/data/stories";

const SuccessStories = () => (
  <section
    id="stories"
    className="border-t border-[#E5E5E5] bg-white py-20 md:py-24"
  >
    <div className="container mx-auto px-4 md:px-8">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
            Latest Stories
          </h2>
          <p className="text-base text-[#111111]/60">
            News, milestones, and reports from our founder ecosystem.
          </p>
        </div>
        <Link
          to="/stories"
          className="group flex items-center gap-1.5 text-sm font-semibold text-[#E50914] transition-colors hover:text-[#c40812]"
        >
          View all stories
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {homepageStories.map((story) => (
          <article
            key={story.slug}
            className="group flex flex-col overflow-hidden rounded-sm border border-[#E5E5E5] bg-white shadow-sm transition-colors hover:border-[#E50914]/30"
          >
            <Link
              to={`/stories/${story.slug}`}
              className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F5]"
            >
              <StoryImage
                src={story.image}
                alt={story.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <span className="rounded-sm bg-[#E50914] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {story.category}
                </span>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-center justify-between text-[13px] font-medium text-[#111111]/50">
                <span>{story.date}</span>
                <span className="font-semibold text-[#E50914]">
                  {story.metric}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold leading-snug text-[#111111] transition-colors group-hover:text-[#E50914]">
                {story.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#111111]/70">
                {story.excerpt}
              </p>
              <div className="mt-auto border-t border-[#E5E5E5] pt-4">
                <Link
                  to={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] transition-colors hover:text-[#E50914]"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
