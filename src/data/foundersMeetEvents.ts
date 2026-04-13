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
        "Registered participants are added to official updates and moved into interview and screening rounds.",
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
      question: "Who should I contact for support?",
      answer: "For support, contact devupsociety@vjit.ac.in.",
    },
  ],
};