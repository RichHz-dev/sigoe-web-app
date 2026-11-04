// import { Link } from 'react-router-dom';

// export default function BrandLogo({ inverted = false, onClick }) {
//   return (
//     <Link
//       to="/"
//       onClick={onClick}
//       aria-label="MASTERLY, ir al inicio"
//       className={`inline-flex shrink-0 flex-col items-center leading-none ${
//         inverted ? 'text-white' : 'text-masterly-navy'
//       }`}
//     >
//       <span className="font-editorial text-[25px] font-semibold tracking-[0.015em] sm:text-[27px]">
//         MASTERLY
//       </span>
//       <span
//         className={`mt-1 text-[7px] font-semibold tracking-[0.20em] ${
//           inverted ? 'text-masterly-sky' : 'text-masterly-vibrant'
//         }`}
//       >
//         CONFECCIÓN DE ALTA GAMA
//       </span>
//     </Link>
//   );
// }


import { Link } from "react-router-dom";

export default function BrandLogo({
  variant = "navy",
  className = "",
  imageClassName = "",
}) {
  const logos = {
    navy: "/brand/logo-navy.png",
    white: "/brand/logo-white.png",
    navy_h: "/brand/logo-navy-h.png",
    white_h: "/brand/logo-white-h.png",
    // icon: "/brand/isotipo.png",
  };

  return (
    <Link
      to="/"
      aria-label="MASTERLY - Ir al inicio"
      className={`inline-flex items-center ${className}`}
    >
      <img
        src={logos[variant] ?? logos.navy}
        alt="MASTERLY - Línea de vestir ideal para ti"
        className={`
          block h-12 w-auto object-contain
          ${imageClassName}
        `}
      />
    </Link>
  );
}
