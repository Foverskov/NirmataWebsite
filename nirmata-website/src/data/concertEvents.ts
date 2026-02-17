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
    title: "Vesterbro Rock Fest",
    dateISO: "2025-03-15",
    displayDate: "March 15, 2025",
    location: "Studenterhuset, Copenhagen",
    imageSrc: "/VBRF2.png",
    detailsUrl: "https://www.facebook.com/events/1345915849727062/",
    ticketUrl: "https://www.facebook.com/events/1345915849727062/",
  },
];
