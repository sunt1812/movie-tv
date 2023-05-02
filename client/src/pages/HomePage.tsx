import { FC } from 'react';
import { tmdbConfigs } from '../api/configs';
import { Heading, HeroSlide, MediaSlide } from '../components/common';

const HomePage: FC = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <main className="p-4">
        <Heading text="POPULAR MOVIES">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Heading>
        <Heading text="POPULAR SERIES">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Heading>
        <Heading text="TOP RATED MOVIES">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Heading>
        <Heading text="TOP RATED SERIES">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Heading>
      </main>
    </>
  );
};

export default HomePage;
