// Installment 002 - Zine Cover Audio Toggle
(function() {
  'use strict';

  const audioToggle = document.querySelector('.audio-toggle');
  let audioContext = null;
  let oscillator = null;
  let isPlaying = true; // Start with audio on by default

  // Create audio context
  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Generate 56k modem chirp sound
  function playModemChirp() {
    if (!audioContext) initAudio();
    
    const duration = 0.3;
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    // Generate modem-like chirp
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const freq1 = 1200 + Math.sin(t * 10) * 200;
      const freq2 = 2400 + Math.sin(t * 15) * 300;
      data[i] = Math.sin(2 * Math.PI * freq1 * t) * 0.3 + 
                Math.sin(2 * Math.PI * freq2 * t) * 0.2;
      data[i] *= Math.exp(-t * 2); // Fade out
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  }

  // Generate CRT hum
  function playCRTHum() {
    if (!audioContext) initAudio();
    
    if (oscillator) {
      oscillator.stop();
      oscillator = null;
    }

    oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 60; // 60Hz hum
    gainNode.gain.value = 0.05; // Very quiet
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
  }

  // Toggle audio
  function toggleAudio() {
    if (!audioContext) {
      initAudio();
    }

    if (isPlaying) {
      // Stop
      if (oscillator) {
        oscillator.stop();
        oscillator = null;
      }
      audioToggle.querySelector('.audio-icon').textContent = '🔊';
      isPlaying = false;
    } else {
      // Play
      playCRTHum();
      audioToggle.querySelector('.audio-icon').textContent = '🔇';
      isPlaying = true;
    }
  }

  // Initialize audio on page load
  function initOnLoad() {
    if (audioToggle) {
      // Set initial button state (muted icon = sound is on)
      audioToggle.querySelector('.audio-icon').textContent = '🔇';
      
      // Try to start audio automatically
      // Note: Browsers may block autoplay, so we'll try but handle gracefully
      try {
        initAudio();
        // Resume audio context if suspended (required by some browsers)
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        playCRTHum();
        isPlaying = true;
      } catch (error) {
        // If autoplay is blocked, user will need to click
        console.log('Audio autoplay blocked, waiting for user interaction');
        isPlaying = false;
        audioToggle.querySelector('.audio-icon').textContent = '🔊';
      }
      
      // Handle click to toggle
      audioToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // If audio context wasn't initialized, initialize it now
        if (!audioContext) {
          initAudio();
        }
        
        // Resume if suspended
        if (audioContext.state === 'suspended') {
          audioContext.resume().then(() => {
            toggleAudio();
          });
        } else {
          toggleAudio();
        }
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOnLoad);
  } else {
    initOnLoad();
  }
})();
