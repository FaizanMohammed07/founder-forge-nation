export type StorySection = {
  title: string;
  paragraphs: string[];
};

export type Story = {
  slug: string;
  title: string;
  founder: string;
  company: string;
  excerpt: string;
  image: string;
  metric: string;
  category: string;
  date: string;
  readTime: string;
  location: string;
  kicker: string;
  quote: string;
  highlights: string[];
  sections: StorySection[];
};

export const stories: Story[] = [
  {
    slug: "eduflow-seed-round",
    title: "EduFlow Closes a Rs2Cr Seed Round to Scale AI Learning Across Tier-2 Cities",
    founder: "Riya Sharma and Aman Verma",
    company: "EduFlow",
    excerpt:
      "The student-founder duo turned a campus pilot into a high-retention AI learning platform and is now expanding into 24 new cities.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
    metric: "Rs2Cr raised",
    category: "EdTech",
    date: "April 10, 2026",
    readTime: "6 min read",
    location: "Jaipur, India",
    kicker: "Capital and execution",
    quote:
      "We stopped building for vanity metrics and started building for weekly learning outcomes. That is when growth finally became repeatable.",
    highlights: [
      "Paid pilot to 18 institutional customers in 11 months",
      "62 percent weekly retention among active learner cohorts",
      "Expansion focused on smaller cities where outcomes matter more than brand noise",
    ],
    sections: [
      {
        title: "From classroom frustration to product clarity",
        paragraphs: [
          "EduFlow began after its founders noticed that most test-prep products were optimized for content volume, not for measurable improvement. Their first version was simple: a feedback loop that identified where a learner was stuck and adjusted the next lesson automatically.",
          "The product only gained momentum after the team narrowed its user promise. Instead of marketing itself as an all-in-one education platform, EduFlow positioned itself around one clear result: faster mastery for exam-heavy learner journeys.",
        ],
      },
      {
        title: "Why investors leaned in",
        paragraphs: [
          "The round came together because the team could show both retention and institutional adoption. Schools were not just testing the product; they were integrating it into weekly learning cycles and reporting better completion consistency across cohorts.",
          "Investors also liked the company's distribution discipline. Rather than chasing metro headlines, EduFlow focused on smaller markets where the need was sharper and customer acquisition costs were lower.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "The new capital will go into teacher tooling, multilingual support, and a stronger analytics layer for school operators. The team expects those upgrades to improve implementation quality as it enters new cities.",
          "For other student founders, the bigger lesson is simple: a focused promise, paired with real user proof, is more persuasive than a broad startup narrative.",
        ],
      },
    ],
  },
  {
    slug: "greencart-sustainable-delivery",
    title: "GreenCart Reaches 10,000 Daily Orders With a Lean Sustainable Delivery Model",
    founder: "Sahil Verma",
    company: "GreenCart",
    excerpt:
      "What looked like a niche logistics experiment has become a repeatable playbook for cost-efficient D2C grocery delivery in dense city clusters.",
    image: "/story-greencart-hero.svg",
    metric: "10K daily orders",
    category: "D2C",
    date: "April 8, 2026",
    readTime: "5 min read",
    location: "Pune, India",
    kicker: "Operations and efficiency",
    quote:
      "The breakthrough was not speed. It was designing a delivery system that stayed profitable even when demand was uneven.",
    highlights: [
      "10,000 plus daily orders across four tightly mapped clusters",
      "Lower delivery cost per order through route density and reusable packaging",
      "Customer repeat behavior driven by reliability, not discounting",
    ],
    sections: [
      {
        title: "A constrained launch was the right launch",
        paragraphs: [
          "GreenCart did not expand citywide on day one. The team launched in a small number of neighborhoods, studied order density, then tuned routes until fulfillment became predictable.",
          "That constraint helped them avoid the usual marketplace trap of scaling losses. Instead of paying for growth with endless promotions, they improved unit economics before widening their footprint.",
        ],
      },
      {
        title: "Where the product advantage showed up",
        paragraphs: [
          "Customers stayed because of consistency. Delivery windows were credible, packaging felt reliable, and the app made substitutions clear instead of frustrating.",
          "The company also built trust by keeping the assortment focused. Rather than trying to be everything, it owned a tight grocery basket that people reordered every week.",
        ],
      },
      {
        title: "The signal for new founders",
        paragraphs: [
          "GreenCart's story is a reminder that in commerce, operational precision can be the product. Distribution quality and interface quality often rise together.",
          "The next phase will test whether the company can keep that discipline as it expands into adjacent categories and new city clusters.",
        ],
      },
    ],
  },
  {
    slug: "medconnect-consultation-milestone",
    title: "MedConnect Crosses 50,000 Remote Consultations and Expands Rural Care Access",
    founder: "Kavya Nair",
    company: "MedConnect",
    excerpt:
      "By building for clinic partners first and patients second, MedConnect unlocked a distribution model that helped telemedicine scale beyond urban convenience use cases.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop",
    metric: "50K consultations",
    category: "HealthTech",
    date: "April 5, 2026",
    readTime: "7 min read",
    location: "Kochi, India",
    kicker: "Access and infrastructure",
    quote:
      "The strongest adoption came when local clinics saw us as workflow infrastructure, not as a replacement for trust.",
    highlights: [
      "50,000 plus completed consultations across semi-urban and rural networks",
      "Clinic-first partnerships improved trust and patient conversion",
      "Operational workflows now support diagnostics, follow-ups, and referrals",
    ],
    sections: [
      {
        title: "Solving for trust before scale",
        paragraphs: [
          "MedConnect learned early that telemedicine alone does not create healthcare trust. The product became more effective when it worked alongside existing clinic relationships instead of trying to bypass them.",
          "That insight shaped everything from onboarding to follow-up reminders. Patients interacted through a familiar local touchpoint while doctors could operate through a cleaner digital workflow.",
        ],
      },
      {
        title: "Why the milestone matters",
        paragraphs: [
          "Crossing 50,000 consultations is important because it reflects operational resilience, not just app traffic. The company had to coordinate scheduling, doctor availability, and post-consult follow-up at scale.",
          "The team now has proof that digital care can move beyond discovery and into repeat, outcome-oriented usage when the system around it is designed carefully.",
        ],
      },
      {
        title: "The next layer of growth",
        paragraphs: [
          "MedConnect is now building deeper integrations for referrals and diagnostics so the platform can become a full care coordination layer for partner clinics.",
          "That move could turn the company from a telemedicine service into a stronger piece of rural healthcare infrastructure.",
        ],
      },
    ],
  },
  {
    slug: "stackmint-campus-fintech",
    title: "StackMint Turns a Campus Payments Tool Into a Faster B2B Fintech Engine",
    founder: "Neel Rao",
    company: "StackMint",
    excerpt:
      "A university wallet experiment evolved into infrastructure for student commerce, reimbursements, and controlled spends across institutions.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1400&auto=format&fit=crop",
    metric: "38 campuses live",
    category: "Fintech",
    date: "April 2, 2026",
    readTime: "5 min read",
    location: "Bengaluru, India",
    kicker: "B2B distribution",
    quote:
      "We stopped pitching a wallet and started pitching a control layer. That changed the conversation overnight.",
    highlights: [
      "Live on 38 campuses with institutional integrations",
      "Payments, reimbursements, and spending controls in one system",
      "B2B positioning improved sales velocity and contract value",
    ],
    sections: [
      {
        title: "The repositioning that unlocked growth",
        paragraphs: [
          "StackMint's original framing focused on student convenience. The team gained traction only after reframing the product around institutional control, compliance, and operational clarity.",
          "That shift turned the product from a nice-to-have wallet into a system administrators could justify and budget for.",
        ],
      },
      {
        title: "Why campuses responded",
        paragraphs: [
          "Campuses wanted fewer fragmented tools. StackMint helped them manage stipends, reimbursements, and internal commerce without stitching together multiple vendors.",
          "Students still benefited from speed and ease, but the buying decision became much easier once the value for finance and operations teams was explicit.",
        ],
      },
      {
        title: "Where the company can compound",
        paragraphs: [
          "If StackMint keeps winning trust with institutions, it can layer more financial workflows on top of its current product surface.",
          "The lesson here is classic founder execution: the same product can feel small or inevitable depending on how clearly it solves the buyer's problem.",
        ],
      },
    ],
  },
  {
    slug: "buildmate-manufacturing-os",
    title: "BuildMate Finds Product Pull by Giving Small Factories a Simpler Operating System",
    founder: "Ishita Kapoor",
    company: "BuildMate",
    excerpt:
      "Instead of chasing enterprise complexity, BuildMate focused on one underserved user: factory owners who needed visibility without a six-month implementation project.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    metric: "120 factories onboarded",
    category: "SaaS",
    date: "March 29, 2026",
    readTime: "6 min read",
    location: "Ahmedabad, India",
    kicker: "Workflow software",
    quote:
      "The market did not need another giant dashboard. It needed a product owners could trust by the end of week one.",
    highlights: [
      "120 factories onboarded with lightweight implementation",
      "Production visibility, task tracking, and reporting in a single layer",
      "Adoption improved because the product respected operational reality",
    ],
    sections: [
      {
        title: "What BuildMate got right",
        paragraphs: [
          "Small manufacturers often avoid software because setup feels expensive, abstract, and disruptive. BuildMate won attention by reducing that friction instead of adding more features.",
          "The company gave operators a faster path to value: clearer shift visibility, better task tracking, and fewer information blind spots.",
        ],
      },
      {
        title: "Designing for the real buyer",
        paragraphs: [
          "The team learned that the real decision maker wanted confidence more than sophistication. That meant straightforward workflows, readable dashboards, and onboarding that did not require a consultant-heavy rollout.",
          "That restraint became a competitive edge. BuildMate looked less impressive in a pitch deck than larger incumbents, but far more usable in the first week of adoption.",
        ],
      },
      {
        title: "A broader signal for B2B founders",
        paragraphs: [
          "There is still room to win in traditional sectors if the product respects how people actually operate. Simplicity can be a growth strategy when competitors have overbuilt their systems.",
          "BuildMate now has a clean base to expand into procurement and maintenance workflows without losing its implementation advantage.",
        ],
      },
    ],
  },
  {
    slug: "orbit-labs-climate-sensors",
    title: "Orbit Labs Wins Early Demand for Climate Monitoring Hardware With Faster Field Deployment",
    founder: "Arnav Kulkarni",
    company: "Orbit Labs",
    excerpt:
      "The hardware startup gained traction by shortening installation time and giving industrial customers cleaner reporting from day one.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1400&auto=format&fit=crop",
    metric: "4 pilot contracts",
    category: "Climate",
    date: "March 22, 2026",
    readTime: "4 min read",
    location: "Hyderabad, India",
    kicker: "Hardware execution",
    quote:
      "Customers did not need another sensor. They needed faster answers and a deployment process that did not create more work.",
    highlights: [
      "Four paid industrial pilots signed within the first quarter",
      "Faster field deployment reduced friction during procurement",
      "Reporting layer helped non-technical teams understand the output quickly",
    ],
    sections: [
      {
        title: "Why deployment speed mattered",
        paragraphs: [
          "Orbit Labs realized buyers were not only evaluating sensor accuracy. They were also judging how disruptive the deployment would be and how quickly teams could act on the data.",
          "That insight changed the product stack. Installation became simpler, the reporting layer became clearer, and the sales motion became easier to defend.",
        ],
      },
      {
        title: "What early pilots validated",
        paragraphs: [
          "The paid pilots proved that customers were willing to move if the product reduced implementation anxiety. In industrial environments, confidence often matters as much as innovation.",
          "Orbit Labs also benefited from packaging the data output in an operationally useful format, rather than expecting teams to interpret raw numbers on their own.",
        ],
      },
      {
        title: "What to watch next",
        paragraphs: [
          "The next challenge will be repeatability across different environments and customer types. Hardware startups rarely earn trust once; they must re-earn it every deployment cycle.",
          "Still, this is the kind of early traction that suggests a disciplined team building for a real operational pain point.",
        ],
      },
    ],
  },
];

export const featuredStory = stories[0];

export const homepageStories = stories.slice(0, 3);

export const storyCategories = Array.from(
  new Set(stories.map((story) => story.category)),
);

export const getStoryBySlug = (slug?: string) =>
  stories.find((story) => story.slug === slug);
