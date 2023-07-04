import { IHcp, Hcp } from "next-shared/src/models/Hcp";
import { mockNextLocations } from "./mockLocations";

const getProfileImages = (id: number) => ({
  full: `https://picsum.photos/id/${id}/2000/1000`,
  squareLarge: `https://picsum.photos/id/${id}/1000`,
  squareMedium: `https://picsum.photos/id/${id}/600`,
  squareSmall: `https://picsum.photos/id/${id}/200`,
});

export const mockHcpsSerialized: IHcp[] = [
  {
    title: "Dr John Wick",
    slug: "hcp-john-wick",
    type: "practitioner",
    suffix: "Dr",
    firstName: "John",
    lastName: "Wick",
    fhirDisplayName: "Dr John Wick",
    ehrId: "1",
    hubId: "MD_WICK",
    npServicesId: "npservices-john-wick",
    worksAt: mockNextLocations[0].slug,
    description: "Specialises in technical issues",
    bioShort:
      "Lorem qui et sit cillum laborum cillum nisi velit fugiat id consectetur cupidatat. Amet incididunt ipsum incididunt quis nulla aliqua in elit Lorem cillum. In mollit labore ea do ullamco ipsum incididunt voluptate adipisicing culpa do dolor.",
    bioLong:
      "<p>Ea fugiat excepteur sunt irure ea qui sint reprehenderit. Sint do aute ex fugiat anim enim reprehenderit est aliquip dolor incididunt anim do. Commodo culpa aliquip incididunt consequat in deserunt culpa dolore nostrud. Ea reprehenderit reprehenderit officia minim reprehenderit reprehenderit anim deserunt ipsum consequat officia reprehenderit. Commodo non ipsum nulla sint duis nostrud anim ipsum pariatur. Ad enim qui nostrud elit adipisicing Lorem ex non pariatur reprehenderit ullamco consequat. Ut pariatur cillum exercitation voluptate velit eiusmod ea adipisicing exercitation.</p>\n<p>Ex nulla mollit occaecat veniam cillum in. Aliquip ad consectetur incididunt sunt esse non et eiusmod ex mollit velit ut. Reprehenderit eiusmod fugiat amet mollit excepteur tempor reprehenderit magna Lorem reprehenderit. Nulla et magna amet excepteur dolor amet cillum. Minim reprehenderit culpa tempor ex. Qui dolore magna do quis. Sint dolore pariatur Lorem ad cillum aute ut ullamco fugiat.</p>\n<p>Consequat cillum culpa tempor irure dolore occaecat officia dolore id. Ipsum et nulla elit dolore consectetur. Qui consequat nostrud pariatur adipisicing minim. Qui in est reprehenderit nulla aute minim culpa. Deserunt mollit cillum deserunt sit magna exercitation duis adipisicing.<br /></p>\n<p>Voluptate pariatur laboris ad amet laboris ad aliqua ad enim est dolor cupidatat ad cillum. Ad labore mollit ex consectetur. Commodo ullamco dolor est Lorem pariatur adipisicing.</p>\n<p>Cillum minim aute adipisicing dolor esse quis do magna laborum ex laborum. Anim aliqua et sit proident cupidatat ut nisi eiusmod nostrud consectetur pariatur est aliquip eu. Officia nisi voluptate occaecat occaecat incididunt sunt anim. Ea eu ipsum ad laborum ut adipisicing aliqua sint id nisi minim quis non. Esse id consequat officia fugiat dolore consectetur anim laborum id tempor occaecat velit. Aute laborum qui est sunt consectetur velit veniam. Veniam elit cupidatat in officia aute officia amet ut officia dolore nisi.</p>",
    profileImage: getProfileImages(5),
    role: {
      label: "Medical",
      value: "medical",
    },
    // all appointment types
    appointmentTypeSlugs: mockNextLocations[0].appointmentTypeSlugs,
    tourDecorationImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/app/tours/_appTourDecoration/TORBEN-SKO-tour.jpg?mtime=20190828221814",
    appointmentMessage: "Please remember to bring your toothbrush.",
    providerNumber: "dr-john-wick",
  },
  {
    title: "Dr Bill Murray",
    slug: "hcp-bill-murray",
    type: "practitioner",
    suffix: "Dr",
    firstName: "Bill",
    lastName: "Murray",
    ehrId: "2",
    hubId: "MD_BILL",
    fhirDisplayName: "Dr Bill Murray",
    npServicesId: "npservices-bill-murray",
    worksAt: mockNextLocations[1].slug,
    description: "Specialises in technical issues",
    bioShort:
      "Lorem qui et sit cillum laborum cillum nisi velit fugiat id consectetur cupidatat. Amet incididunt ipsum incididunt quis nulla aliqua in elit Lorem cillum. In mollit labore ea do ullamco ipsum incididunt voluptate adipisicing culpa do dolor.",
    bioLong:
      "<p>Ea fugiat excepteur sunt irure ea qui sint reprehenderit. Sint do aute ex fugiat anim enim reprehenderit est aliquip dolor incididunt anim do. Commodo culpa aliquip incididunt consequat in deserunt culpa dolore nostrud. Ea reprehenderit reprehenderit officia minim reprehenderit reprehenderit anim deserunt ipsum consequat officia reprehenderit. Commodo non ipsum nulla sint duis nostrud anim ipsum pariatur. Ad enim qui nostrud elit adipisicing Lorem ex non pariatur reprehenderit ullamco consequat. Ut pariatur cillum exercitation voluptate velit eiusmod ea adipisicing exercitation.</p>\n<p>Ex nulla mollit occaecat veniam cillum in. Aliquip ad consectetur incididunt sunt esse non et eiusmod ex mollit velit ut. Reprehenderit eiusmod fugiat amet mollit excepteur tempor reprehenderit magna Lorem reprehenderit. Nulla et magna amet excepteur dolor amet cillum. Minim reprehenderit culpa tempor ex. Qui dolore magna do quis. Sint dolore pariatur Lorem ad cillum aute ut ullamco fugiat.</p>\n<p>Consequat cillum culpa tempor irure dolore occaecat officia dolore id. Ipsum et nulla elit dolore consectetur. Qui consequat nostrud pariatur adipisicing minim. Qui in est reprehenderit nulla aute minim culpa. Deserunt mollit cillum deserunt sit magna exercitation duis adipisicing.<br /></p>\n<p>Voluptate pariatur laboris ad amet laboris ad aliqua ad enim est dolor cupidatat ad cillum. Ad labore mollit ex consectetur. Commodo ullamco dolor est Lorem pariatur adipisicing.</p>\n<p>Cillum minim aute adipisicing dolor esse quis do magna laborum ex laborum. Anim aliqua et sit proident cupidatat ut nisi eiusmod nostrud consectetur pariatur est aliquip eu. Officia nisi voluptate occaecat occaecat incididunt sunt anim. Ea eu ipsum ad laborum ut adipisicing aliqua sint id nisi minim quis non. Esse id consequat officia fugiat dolore consectetur anim laborum id tempor occaecat velit. Aute laborum qui est sunt consectetur velit veniam. Veniam elit cupidatat in officia aute officia amet ut officia dolore nisi.</p>",
    profileImage: getProfileImages(10),
    role: {
      label: "Medical",
      value: "medical",
    },
    // all location B's appointments
    appointmentTypeSlugs: mockNextLocations[1].appointmentTypeSlugs,
    tourDecorationImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/app/tours/_appTourDecoration/TORBEN-SKO-tour.jpg?mtime=20190828221814",
    appointmentMessage: "Please remember to bring your toothbrush.",
    providerNumber: "dr-bill-murray",
  },
  {
    title: "Dr John Matrix",
    slug: "hcp-john-matrix",
    type: "practitioner",
    suffix: "Dr",
    firstName: "John",
    lastName: "Matrix",
    ehrId: "3",
    hubId: "MD_JOHN",
    fhirDisplayName: "Dr John Matrix",
    npServicesId: "npservices-john-matrix",
    worksAt: mockNextLocations[2].slug,
    description:
      "Nisi voluptate reprehenderit nostrud nisi irure sit laborum eiusmod.",
    bioShort:
      "Lorem qui et sit cillum laborum cillum nisi velit fugiat id consectetur cupidatat. Amet incididunt ipsum incididunt quis nulla aliqua in elit Lorem cillum. In mollit labore ea do ullamco ipsum incididunt voluptate adipisicing culpa do dolor.",
    bioLong:
      "<p>Ea fugiat excepteur sunt irure ea qui sint reprehenderit. Sint do aute ex fugiat anim enim reprehenderit est aliquip dolor incididunt anim do. Commodo culpa aliquip incididunt consequat in deserunt culpa dolore nostrud. Ea reprehenderit reprehenderit officia minim reprehenderit reprehenderit anim deserunt ipsum consequat officia reprehenderit. Commodo non ipsum nulla sint duis nostrud anim ipsum pariatur. Ad enim qui nostrud elit adipisicing Lorem ex non pariatur reprehenderit ullamco consequat. Ut pariatur cillum exercitation voluptate velit eiusmod ea adipisicing exercitation.</p>\n<p>Ex nulla mollit occaecat veniam cillum in. Aliquip ad consectetur incididunt sunt esse non et eiusmod ex mollit velit ut. Reprehenderit eiusmod fugiat amet mollit excepteur tempor reprehenderit magna Lorem reprehenderit. Nulla et magna amet excepteur dolor amet cillum. Minim reprehenderit culpa tempor ex. Qui dolore magna do quis. Sint dolore pariatur Lorem ad cillum aute ut ullamco fugiat.</p>\n<p>Consequat cillum culpa tempor irure dolore occaecat officia dolore id. Ipsum et nulla elit dolore consectetur. Qui consequat nostrud pariatur adipisicing minim. Qui in est reprehenderit nulla aute minim culpa. Deserunt mollit cillum deserunt sit magna exercitation duis adipisicing.<br /></p>\n<p>Voluptate pariatur laboris ad amet laboris ad aliqua ad enim est dolor cupidatat ad cillum. Ad labore mollit ex consectetur. Commodo ullamco dolor est Lorem pariatur adipisicing.</p>\n<p>Cillum minim aute adipisicing dolor esse quis do magna laborum ex laborum. Anim aliqua et sit proident cupidatat ut nisi eiusmod nostrud consectetur pariatur est aliquip eu. Officia nisi voluptate occaecat occaecat incididunt sunt anim. Ea eu ipsum ad laborum ut adipisicing aliqua sint id nisi minim quis non. Esse id consequat officia fugiat dolore consectetur anim laborum id tempor occaecat velit. Aute laborum qui est sunt consectetur velit veniam. Veniam elit cupidatat in officia aute officia amet ut officia dolore nisi.</p>",
    profileImage: getProfileImages(50),
    role: {
      label: "Medical",
      value: "medical",
    },
    // the first appointment for location B
    appointmentTypeSlugs: [mockNextLocations[1].appointmentTypeSlugs[0]],
    tourDecorationImage:
      "https://d1qr34qzhiwpdo.cloudfront.net/app/tours/_appTourDecoration/TORBEN-SKO-tour.jpg?mtime=20190828221814",
    appointmentMessage: "Please remember to bring your toothbrush.",
    providerNumber: "dr-john-matrix",
  },
];

export const mockHcps: Hcp[] = mockHcpsSerialized.map(
  (user) => Hcp.unserialize(user) as Hcp,
);
