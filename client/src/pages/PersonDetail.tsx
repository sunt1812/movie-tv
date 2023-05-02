import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { tmdbConfigs } from '../api/configs';
import { personApi } from '../api/modules';
import { ButtonLoadMore, Heading, MediaItem } from '../components/common';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { useAppDispatch } from '../redux/hooks';
import { ICast, IPersonResponse } from '../utils/interfaces';

const PersonDetail = () => {
  const { personId } = useParams();
  const skip = 8;
  const [person, setPerson] = useState<IPersonResponse | undefined>();
  const [medias, setMedias] = useState<ICast[] | undefined>();
  const [filteredMedias, setFilteredMedias] = useState<ICast[] | undefined>();
  const [page, setPage] = useState<number>(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let here = false;
    const getPreson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await personApi.getPersonDetail({ personId });

      const { medias, errorMedias } = await personApi.getPersonMedias({
        personId,
      });

      dispatch(setGlobalLoading(false));
      if (!here) {
        if (response) setPerson(response);
        if (medias) {
          const mediasSorted = medias.cast?.sort(
            (a, b) => getReleaseDate(b) - getReleaseDate(a)
          );
          setMedias([...(mediasSorted || [])]);
          setFilteredMedias([...(mediasSorted || [])].splice(0, skip));
        }
        if (errorMedias || error) toast.error(errorMedias || error);
      }
    };
    getPreson();
    return () => {
      here = true;
    };
  }, [personId, dispatch]);

  const getReleaseDate = (media: any): any => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  const handleButton = () => {
    setFilteredMedias([
      ...(filteredMedias || []),
      ...[...(medias || [])].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };
  const checkArrLength = (a: number, b: number) => {
    return a < b ? true : false;
  };
  return (
    <>
      {' '}
      {person && (
        <div className="mx-4">
          {/* person detail */}
          <div className="flex flex-col md:flex-row my-20">
            <div className="w-1/2 md:w-1/4 ">
              <div
                className="bg-cover bg-center pt-[160%]"
                style={{
                  backgroundImage: `url(${tmdbConfigs.posterPath(
                    person?.profile_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="w-full md::w-3/4 py-4 md:px-8">
              <h3 className="text-2xl dark:text-black text-white font-bold mb-4">
                {person?.name} ({person?.birthday?.split('-')[0]})
              </h3>
              <p className="text-line-10">{person?.biography}</p>
            </div>
          </div>
          {/* person detail */}

          {/* medias detail */}
          <Heading text="MEDIAS">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
              {filteredMedias?.map((media, index) => (
                <MediaItem
                  key={index}
                  media={media}
                  mediaType={media.media_type}
                />
              ))}
            </div>

            {checkArrLength(
              filteredMedias?.length as number,
              medias?.length as number
            ) && <ButtonLoadMore onClick={handleButton} children="Load more" />}
          </Heading>
        </div>
      )}
    </>
  );
};

export default PersonDetail;
