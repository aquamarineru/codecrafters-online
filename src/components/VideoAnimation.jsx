import React, { useEffect } from 'react'

function VideoAnimation({ webm, fallback, aspectratio, alt, caption }) {
    useEffect(() => {
        const loadLozad = async () => {
          try {
            const lozad = (await import('lozad')).default;
            const observer = lozad();
            observer.observe();
          } catch (error) {
            console.error('Failed to load lozad:', error);
          }
        }
        
        loadLozad()
      }, [])

    if (!webm || !fallback) {
        return null;
      }
      const videoError = (e) => {
        // handle video not loading
        console.error('Video failed to load');
        // You can replace the video with an error message or image here.
      }

      const aspectRatioPadding = aspectratio ? `${(1 / aspectratio) * 100}%` : '0%';
  return (
        <figure 
        className='w-full h-full'
        style={{paddingTop: aspectRatioPadding}} >
            <video
                title={alt}
                loop 
                muted 
                autoPlay 
                playsInline
                style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: "cover" }}
                className='lozad'
                onError={videoError}
            >
                <source data-src={webm} src='' type="video/webm" />
                <source data-src={fallback} src={fallback.asset._ref} type="video/mp4" />
            </video>
            <figcaption>{caption}</figcaption>
        </figure>
  )
}

export default VideoAnimation