'use client';

interface VideoPlayerProps {
  videoUrl?: string;
  title?: string;
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center">
        <p className="text-zinc-400">No video available</p>
      </div>
    );
  }

  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  
  let src = videoUrl;
  if (isYouTube) {
    const videoId = videoUrl.includes('v=') 
      ? videoUrl.split('v=')[1]?.split('&')[0]
      : videoUrl.split('/').pop();
    src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      {isYouTube ? (
        <iframe
          src={src}
          title={title || 'Video player'}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          src={videoUrl}
          controls
          className="w-full h-full object-contain"
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
