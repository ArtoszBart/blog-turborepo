import Image from 'next/image';
import WaveDivider from '../ui/WaveDivider';
import './hero.scss';

export default function Hero() {
  return (
    <div className='hero'>
      <div className='hero_container'>
        <div className='hero_container_content'>
          <p className='hero_container_content_intro'>
            A little corner for learning and experimenting with code
          </p>
          <h1 className='hero_container_content_title'>My Coding Playground</h1>

          <p className='hero_container_content_description'>
            This is not a real blog or a commercial project — just a hobby
            project to explore ideas, practice coding, and share small
            experiments. Built with Nest.js, Next.js, TypeScript, SCSS, and
            Turborepo.
          </p>
        </div>

        <div className='hero_container_image-container'>
          <Image
            src='/hero.webp'
            alt='hero image'
            className='hero_container_image-container_image'
            width={500}
            height={500}
          />
        </div>
      </div>

      <WaveDivider />
    </div>
  );
}
