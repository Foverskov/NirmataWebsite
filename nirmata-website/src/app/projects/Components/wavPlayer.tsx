// AudioPlayer.tsx
'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  preload?: 'auto' | 'metadata' | 'none';
  className?: string;
  onError?: (error: string) => void;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  crossOrigin?: 'anonymous' | 'use-credentials';
  enableStreaming?: boolean;
  bufferSize?: number;
  debug?: boolean; // Add debug mode
}

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  isBuffering: boolean;
  error: string | null;
  bufferedRanges: TimeRanges | null;
  canPlayThrough: boolean;
  networkState: number;
}

export default function AudioPlayer({ 
  src, 
  title, 
  preload = 'metadata',
  className = '',
  onError,
  onLoadStart,
  onLoadComplete,
  crossOrigin = 'anonymous',
  enableStreaming = true,
  bufferSize = 1024 * 1024, // 1MB buffer
  debug = false
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isLoading: true, // Start with loading true
    isBuffering: false,
    error: null,
    bufferedRanges: null,
    canPlayThrough: false,
    networkState: 0
  });

  // Debounced seek function for performance
  const debouncedSeek = useCallback((time: number) => {
    if (seekTimeoutRef.current) {
      clearTimeout(seekTimeoutRef.current);
    }
    
    seekTimeoutRef.current = setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = time;
        setState(prev => ({ ...prev, currentTime: time }));
      }
    }, 100);
  }, []);

  // Audio event handlers
  const handleLoadStart = useCallback(() => {
    if (debug) console.log('AudioPlayer: Load start', { src });
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    onLoadStart?.();
  }, [onLoadStart, debug, src]);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (debug) console.log('AudioPlayer: Metadata loaded', { 
        duration: audio.duration, 
        readyState: audio.readyState,
        src 
      });
      setState(prev => ({ 
        ...prev, 
        duration: audio.duration, 
        isLoading: false 
      }));
      onLoadComplete?.();
    }
  }, [onLoadComplete, debug, src]);

  // Check initial audio state when component mounts
  const checkInitialAudioState = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (debug) console.log('AudioPlayer: Checking initial state', { 
      readyState: audio.readyState, 
      duration: audio.duration,
      src
    });

    // Check if audio already has metadata loaded
    if (audio.readyState >= 1) { // HAVE_METADATA or higher
      if (debug) console.log('AudioPlayer: Audio already loaded, updating state');
      setState(prev => ({
        ...prev,
        duration: audio.duration,
        isLoading: false,
        currentTime: audio.currentTime,
        bufferedRanges: audio.buffered,
        networkState: audio.networkState
      }));
      onLoadComplete?.();
    } else if (audio.readyState === 0) { // HAVE_NOTHING
      // Explicitly set loading state for fresh audio elements
      if (debug) console.log('AudioPlayer: Audio not loaded, setting loading state');
      setState(prev => ({ ...prev, isLoading: true }));
    }
  }, [onLoadComplete, debug, src]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !seekTimeoutRef.current) {
      setState(prev => ({ 
        ...prev, 
        currentTime: audio.currentTime,
        bufferedRanges: audio.buffered,
        networkState: audio.networkState
      }));
    }
  }, []);

  const handleProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setState(prev => ({ 
        ...prev, 
        bufferedRanges: audio.buffered,
        networkState: audio.networkState
      }));
    }
  }, []);

  const handleCanPlayThrough = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isBuffering: false, 
      canPlayThrough: true 
    }));
  }, []);

  const handleWaiting = useCallback(() => {
    setState(prev => ({ ...prev, isBuffering: true }));
  }, []);

  const handleCanPlay = useCallback(() => {
    setState(prev => ({ ...prev, isBuffering: false }));
  }, []);

  const handleError = useCallback(() => {
    const audio = audioRef.current;
    const errorMessage = audio?.error 
      ? `Audio error: ${audio.error.code}` 
      : 'Unknown audio error';
    
    setState(prev => ({ 
      ...prev, 
      error: errorMessage, 
      isLoading: false, 
      isBuffering: false 
    }));
    onError?.(errorMessage);
  }, [onError]);

  const handleEnded = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
  }, []);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check initial state immediately
    checkInitialAudioState();

    // Add all event listeners
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      // Cleanup all event listeners
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      
      // Clear any pending timeouts
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
    };
  }, [
    checkInitialAudioState,
    handleLoadStart,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleProgress,
    handleWaiting,
    handleCanPlay,
    handleCanPlayThrough,
    handleError,
    handleEnded
  ]);

  // Handle src changes - reset loading state when src changes
  useEffect(() => {
    if (debug) console.log('AudioPlayer: Src changed, resetting state', { src });
    // Reset state when src changes
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      canPlayThrough: false
    }));

    // Use a small timeout to allow the audio element to update
    const timeoutId = setTimeout(() => {
      checkInitialAudioState();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [src, checkInitialAudioState, debug]);

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (state.isPlaying) {
        audio.pause();
        setState(prev => ({ ...prev, isPlaying: false }));
      } else {
        await audio.play();
        setState(prev => ({ ...prev, isPlaying: true }));
      }
    } catch (error) {
      const errorMessage = `Playback failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setState(prev => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    }
  }, [state.isPlaying, onError]);

  // Seek handler with debouncing
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setState(prev => ({ ...prev, currentTime: time }));
    debouncedSeek(time);
  }, [debouncedSeek]);

  // Keyboard controls
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        togglePlayback();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        debouncedSeek(Math.max(0, state.currentTime - 10));
        break;
      case 'ArrowRight':
        e.preventDefault();
        debouncedSeek(Math.min(state.duration, state.currentTime + 10));
        break;
    }
  }, [togglePlayback, debouncedSeek, state.currentTime, state.duration]);

  // Calculate buffer percentage for visualization
  const getBufferPercentage = useCallback(() => {
    if (!state.bufferedRanges || state.duration === 0) return 0;
    
    let buffered = 0;
    for (let i = 0; i < state.bufferedRanges.length; i++) {
      buffered += state.bufferedRanges.end(i) - state.bufferedRanges.start(i);
    }
    
    return (buffered / state.duration) * 100;
  }, [state.bufferedRanges, state.duration]);

  // Network state description
  const getNetworkStateText = useCallback(() => {
    switch (state.networkState) {
      case 0: return 'Empty';
      case 1: return 'Idle';
      case 2: return 'Loading...';
      case 3: return 'No Source';
      default: return 'Unknown';
    }
  }, [state.networkState]);

  // Format time utility
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`audio-player ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Audio player for ${title}`}
    >
      {/* Title */}
      <div className="audio-player__title text-white font-bold text-lg mt-18 mb-6 text-center" id="audio-title">
        {/* {title} */}
      </div>

      {/* Hidden audio element with streaming optimizations */}
      <audio 
        ref={audioRef} 
        src={src} 
        preload={preload}
        crossOrigin={crossOrigin}
        aria-labelledby="audio-title"
        // Streaming optimizations
        controlsList="nodownload"
        // Buffer optimization attributes
        {...(enableStreaming && {
          'data-buffer-size': bufferSize,
          'data-streaming': 'true'
        })}
      />

      {/* Error display */}
      {state.error && (
        <div className="audio-player__error" role="alert">
          {state.error}
        </div>
      )}

      {/* Controls */}
      <div className="audio-player__controls flex flex-col items-center gap-6">
        {/* Play/Pause button - Large and prominent */}
        <button 
          onClick={togglePlayback}
          disabled={state.isLoading || !!state.error}
          aria-label={state.isPlaying ? 'Pause audio' : 'Play audio'}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-red-600 hover:from-red-600 hover:via-orange-600 hover:to-red-700 disabled:from-gray-500 disabled:to-gray-600 flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
        >
          {state.isLoading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : state.isBuffering ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : state.isPlaying ? (
            // Pause icon - larger
            <div className="flex gap-1.5">
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
              <div className="w-1.5 h-6 bg-white rounded-sm"></div>
            </div>
          ) : (
            // Play icon - larger and better positioned
            <div 
              className="ml-1"
              style={{
                width: 0,
                height: 0,
                borderLeft: '12px solid white',
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent'
              }}
            />
          )}
        </button>

        {/* Time display */}
        <div className="audio-player__time text-white text-lg font-mono tracking-wider" aria-live="polite">
          {formatTime(state.currentTime)} / {formatTime(state.duration)}
        </div>

        {/* Progress bar with fire theme */}
        <div className="w-full audio-player__progress">
          <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Buffer background */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-full transition-all duration-300"
              style={{ width: `${getBufferPercentage()}%` }}
            />
            
            {/* Progress fill */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-400 rounded-full shadow-lg transition-all duration-150"
              style={{ width: `${(state.currentTime / (state.duration || 1)) * 100}%` }}
            />
            
            {/* Interactive overlay */}
            <input
              type="range"
              min="0"
              max={state.duration || 0}
              value={state.currentTime}
              onChange={handleSeek}
              disabled={state.isLoading || !!state.error}
              aria-label="Seek audio position"
              aria-valuemin={0}
              aria-valuemax={state.duration}
              aria-valuenow={state.currentTime}
              aria-valuetext={`${formatTime(state.currentTime)} of ${formatTime(state.duration)}`}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          {/* Streaming info */}
          {enableStreaming && state.networkState === 2 && (
            <div className="text-xs text-red-400 mt-2 text-center">
              {getNetworkStateText()} - Buffer: {Math.round(getBufferPercentage())}%
            </div>
          )}
        </div>
      </div>

      {/* Debug info */}
      {debug && (
        <div className="audio-player__debug text-xs text-gray-500 mt-2 p-2 bg-gray-100 rounded">
          <div>Ready State: {audioRef.current?.readyState || 'N/A'}</div>
          <div>Network State: {state.networkState} ({getNetworkStateText()})</div>
          <div>Loading: {state.isLoading.toString()}</div>
          <div>Buffering: {state.isBuffering.toString()}</div>
          <div>Can Play Through: {state.canPlayThrough.toString()}</div>
          <div>Duration: {state.duration}</div>
          <div>Current Time: {state.currentTime}</div>
        </div>
      )}
    </div>
  );
}
