export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PartnerLogo {
  name: string;
  imageUrl: string;
  domain: string;
}

export interface EcosystemCard {
  title: string;
  logoUrl: string;
  description: string;
}

export interface HighlightItem {
  title: string;
  description: string;
}

export interface Posters {
  mainTitle: string;
  mainImageUrl: string;
  timelineTitle: string;
  timelineImageUrl: string;
}

export interface VenueMap {
  embedUrl: string;
  venueText: string;
  externalUrl: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  status: "upcoming" | "past";
  registrationLink?: string;
  fee?: number;
  seatsLeft?: number;
  timeline?: TimelineItem[];
  faqs?: FAQItem[];
  partners?: PartnerLogo[];
  posters?: Posters;
  organizerCards?: EcosystemCard[];
  associatePartners?: EcosystemCard[];
  collaborationHighlights?: HighlightItem[];
  venueMap?: VenueMap;
}

export const foundersMeetEvent: Event = {
  id: "evt-002",
  title: "Founders Meet 2026",
  slug: "founders-meet-2026",
  date: "2026-04-18",
  location: "T-HUB, Hyderabad",
  mode: "Offline",
  shortDescription:
    "Founders Meet 2026 is a high-impact startup networking and founder showcase event at T-HUB on 18 April 2026. Registration is free, followed by interviews and screening.",
  fullDescription:
    "DevUp Society presents Founders Meet 2026 at T-HUB, Hyderabad. Everyone can register for free. All registered participants are guided through WhatsApp updates and interview-based screening. Selected participants then complete payment and final confirmation before the main event on 18 April 2026, featuring founder interactions, networking, and high-visibility sessions.",
  tags: ["FoundersMeet", "Startup", "Networking", "Mentorship", "Innovation"],
  status: "upcoming",
  fee: 1000,
  seatsLeft: 100,
  partners: [
    {
      name: "Startup India",
      imageUrl:
        "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1770106897/Startups_India_Logo_ba8vml.png",
      domain: "startupsindia.in",
    },
    {
      name: "DevUp",
      imageUrl:
        "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1776086729/favicon_sox9m8.png",
      domain: "devupvjit.in",
    },
    {
      name: "T-Hub",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/T-Hub_Logo-PNG.png",
      domain: "t-hub.co",
    },
  ],
  posters: {
    mainTitle: "Main Event Poster",
    mainImageUrl:
      "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1775898652/Founders_Meet_Poster_lxwujw.png",
    timelineTitle: "Timeline Poster",
    timelineImageUrl:
      "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1775898653/Timeline_zsbyuj.png",
  },
  organizerCards: [
    {
      title: "Main Organizer",
      logoUrl:
        "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1770106897/Startups_India_Logo_ba8vml.png",
      description: "Startup India",
    },
    {
      title: "Venue Ecosystem",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/T-Hub_Logo-PNG.png",
      description: "T-HUB",
    },
  ],
  associatePartners: [
    {
      title: "Associate Partner",
      logoUrl:
        "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1776086729/favicon_sox9m8.png",
      description: "DevUp",
    },
    {
      title: "Associate Partner",
      logoUrl:
        "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1770106897/IEC-Logo_cxbv77.png",
      description: "IEC",
    },
  ],
  collaborationHighlights: [
    {
      title: "Startup Ecosystem Connect",
      description:
        "Opportunity mapping with startup community pathways.",
    },
    {
      title: "T-HUB Network Access",
      description:
        "Founder exposure and ecosystem-level interaction opportunities.",
    },
    {
      title: "Mentor & Community Connect",
      description:
        "Focused support with partner communities and domain mentors.",
    },
  ],
  venueMap: {
    embedUrl: "https://www.google.com/maps?q=T-Hub,+Hyderabad&output=embed",
    venueText: "T-HUB, Hyderabad",
    externalUrl: "https://maps.app.goo.gl/c4umsMpk6xYw3rcF8",
  },
  registrationLink: "/events/founders-meet-2026/register",
  timeline: [
    {
      id: 1,
      title: "Registration Closes",
      date: "Apr 14",
      description: "Final date for registration submissions.",
    },
    {
      id: 2,
      title: "Online Pitching Phase",
      date: "Apr 14-16",
      description: "Selected participants take part in online pitching rounds.",
    },
    {
      id: 3,
      title: "Shortlisted Innovators Declared",
      date: "Apr 16",
      description: "Official shortlist announcement for next-stage participants.",
    },
    {
      id: 4,
      title: "Founders Meet Registration Window",
      date: "Apr 16-17",
      description: "Shortlisted participants complete founders meet registration.",
    },
    {
      id: 5,
      title: "Founders Meet Main Event @ T-HUB",
      date: "Apr 18",
      description: "In-person flagship founders meet at T-HUB, Hyderabad.",
    },
  ],
  faqs: [
    {
      question: "What is the event date and venue?",
      answer:
        "Founders Meet 2026 main event is on 18 April 2026 at T-HUB, Hyderabad.",
    },
    {
      question: "Is registration free for everyone?",
      answer: "Yes. Initial registration is free for all participants.",
    },
    {
      question: "What happens after registration?",
      answer:
        "Registered participants are added to the official WhatsApp updates channel and moved into interview and screening rounds.",
    },
    {
      question: "When is payment required?",
      answer:
        "Only selected participants are asked to complete payment after screening.",
    },
    {
      question: "How are participants selected?",
      answer:
        "Selections are made through interviews and profile screening by the event team.",
    },
    {
      question: "How do I register?",
      answer: "Use the Register button on the event page and submit your details.",
    },
    {
      question: "Who should I contact for support?",
      answer: "For support, contact devupsociety@vjit.ac.in.",
    },
  ],
};