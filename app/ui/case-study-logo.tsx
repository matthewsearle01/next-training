import { lusitana } from './fonts';
import Image from 'next/image';

export default function CaseStudyLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
          src="/caseStudy.png"
          width={60}
          height={60}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
      <p className="text-[40px] ps-2">Case Study Hub</p>
    </div>
  );
}
