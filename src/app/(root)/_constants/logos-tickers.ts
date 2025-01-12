const acmeLogo = '/acme.svg';
const apexLogo = '/apex.svg';
const celestiaLogo = '/celestia.svg';
const echoLogo = '/echo.svg';
const pulseLogo = '/pulse.svg';
const quantumLogo = '/quantum.svg';

type LogoTicker = { id: string; src: string | undefined; alt: string }

export const logosTickers: LogoTicker[] = [
  {
    id: '1',
    src: acmeLogo,
    alt: 'Acme Logo',
  },
  {
    id: '2',
    src: quantumLogo,
    alt: 'Quantum Logo',
  },
  {
    id: '3',
    src: echoLogo,
    alt: 'Echo Logo',
  },
  {
    id: '4',
    src: celestiaLogo,
    alt: 'Celestia Logo',
  },
  {
    id: '5',
    src: pulseLogo,
    alt: 'Pulse Logo',
  },
  {
    id: '6',
    src: apexLogo,
    alt: 'Apex Logo',
  },
]