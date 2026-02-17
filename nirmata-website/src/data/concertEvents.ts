export type ConcertEvent = {
  title: string;
  dateISO: string;
  displayDate: string;
  location: string;
  imageSrc: string;
  detailsUrl: string;
  ticketUrl?: string;
};

export const concertEvents: ConcertEvent[] = [
  {
    title: "Desert Storm (UK) + Nirmata (DK) | Råhuset",
    dateISO: "2026-04-09",
    displayDate: "April 9, 2026",
    location: "Onkel Dannys Plads 7, 1711 Copenhagen",
    imageSrc: "/DesertStorm.jpg",
    detailsUrl: "https://www.facebook.com/events/1285861296701153", 
    ticketUrl:"https://www.facebook.com/events/1285861296701153",
  },
  {
    title: "FREKVENT // Nirmata // Advocacy | Walthers MusikCafe",
    dateISO: "2026-06-13",
    displayDate: "June 13, 2026",
    location: "Walthers MusikCafe, Copenhagen",
    imageSrc: "/walthers.jpg",
    detailsUrl: "https://fb.me/e/134567890", 
    ticketUrl: "",
  },
  {
    title: "Feather Mountain + Support: Nirmata | Beta2300 ",
    dateISO: "2025-11-28",
    displayDate: "November 28, 2025",
    location: "Beta2300, Copenhagen",
    imageSrc: "/FM.jpg",
    detailsUrl: "https://fb.me/e/37hOq3fjg", 
    ticketUrl: "",
  },
  {
    title: "Frekvent + Nirmata | Posten, Odense",
    dateISO: "2025-11-27",
    displayDate: "November 27, 2025",
    location: "Posten, Odense",
    imageSrc: "/Frekvent.jpg",
    detailsUrl: "https://fb.me/e/6cPfMuMcC", 
    ticketUrl: "https://www.facebook.com/events/1234567890123457",
  },
  {
    title: "Nirmata + Support: Drømmer Om | Release |Urban13 ",
    dateISO: "2025-11-01",
    displayDate: "November 1, 2025",
    location: "Urban13, Copenhagen",
    imageSrc: "/AvernoReleaseCons.jpg",
    detailsUrl: "https://fb.me/e/3qoMKzyAM", 
    ticketUrl: "",
  },
  {
    title: "Vesterbro Rock Fest",
    dateISO: "2025-03-15",
    displayDate: "March 15, 2025",
    location: "Studenterhuset, Copenhagen",
    imageSrc: "/VBRF2.png",
    detailsUrl: "https://www.facebook.com/events/1345915849727062/",
    ticketUrl: "https://www.facebook.com/events/1345915849727062/",
  },
  
];
