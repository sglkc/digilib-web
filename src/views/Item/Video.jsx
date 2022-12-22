import ReactPlayer from 'react-player';
import Axios from '@/func/Axios';

export default function Video({ className, cover, media }) {
  const mediaUrl = Axios.getUri({ url: '/files/media/' + media })

  return (
    <ReactPlayer
      className={className}
      url={mediaUrl}
      controls={true}
      width="100%"
      height={300}
      light={cover}
      config={{
        file: {
          attributes: {
            controlsList: 'nodownload',
            style: { maxHeight: '20rem' }
          },
          forceVideo: true
        }
      }}
    />
  );
}
