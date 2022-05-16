import {
  Person,
  Phone,
  Github,
  Linkedin,
  Envelope,
  Lock,
  Image,
  TextLeft,
} from "react-bootstrap-icons";

export const data = [
  {
    label: "name",
    labelTitle: "Your name",
    img: <Person />,
    type: "text",
  },

  {
    label: "email",
    labelTitle: "Your email",
    img: <Envelope />,
    type: "email",
  },

  {
    label: "phone",
    labelTitle: "Your Phone Numer",
    img: <Phone />,
    type: "number",
  },
  {
    label: "image",
    labelTitle: "Your Profile Image",
    img: <Image />,
    type: "file",
  },
  {
    label: "github",
    labelTitle: "Your Github Link",
    img: <Github />,
    type: "text",
  },
  {
    label: "linkedIn",
    labelTitle: "Your Linkedin Link",
    img: <Linkedin />,
    type: "text",
  },
  {
    label: "description",
    labelTitle: "Your Description",
    img: <TextLeft />,
    type: "textarea",
    extra: {
      rows: "5",
      cols: "70",
    },
  },
];
