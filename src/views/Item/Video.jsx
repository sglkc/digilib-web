import ReactPlayer from 'react-player';

export default function Video({ className, cover, media }) {
  return (
    <ReactPlayer
      className={className}
      url={media}
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
