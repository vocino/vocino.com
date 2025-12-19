// Terminal Easter Egg
(function() {
  'use strict';

  const terminalContainer = document.getElementById('terminal-container');
  const terminal = document.getElementById('terminal');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalOverlay = document.getElementById('terminal-overlay');
  
  let isFocused = false;
  let commandHistory = [];
  let historyIndex = -1;

  // Commands object
  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        return `Available commands:
  help          - Show this help message
  about         - About Travis Vocino
  whoami        - Display current user
  ls            - List projects/interests
  clear         - Clear terminal output
  exit          - Exit terminal mode
  fortune       - Get a random fortune
  date          - Show current date and time
  echo [text]   - Echo text back
  contact       - Get contact information
  social        - Show social links`;
      }
    },
    
    about: {
      description: 'About Travis Vocino',
      execute: () => {
        return `Travis Vocino
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Director of Product Design @ Meta
Maker. Nerd tchotchke collector. Chaotic good.

Building tools, prototypes, and systems that reduce chaos.
Focused on communities, how people find each other, connect 
around their passions, and keep showing up.

Also an investor in early stage companies, mostly indie 
games, fintech, and creator tools. Big fan of founders 
with design taste and a bias toward shipping.

San Francisco and London.`;
      }
    },
    
    whoami: {
      description: 'Display current user',
      execute: () => {
        return 'travis';
      }
    },
    
    ls: {
      description: 'List projects/interests',
      execute: () => {
        return `projects/
  ├── product-design/
  ├── communities/
  ├── early-stage-investing/
  └── nerd-tchotchkes/

interests/
  ├── indie-games/
  ├── fintech/
  ├── creator-tools/
  └── cyberware/`;
      }
    },
    
    clear: {
      description: 'Clear terminal output',
      execute: () => {
        terminalOutput.innerHTML = '';
        terminalOutput.classList.remove('has-content');
        return null; // Don't add output line
      }
    },
    
    exit: {
      description: 'Exit terminal mode',
      execute: () => {
        // Clear output first
        terminalOutput.innerHTML = '';
        terminalOutput.classList.remove('has-content');
        // Clear input
        terminalInput.value = '';
        // Exit terminal mode
        exitTerminalMode();
        return null;
      }
    },
    
    fortune: {
      description: 'Get a random fortune',
      execute: () => {
        const fortunes = [
          'The best way to predict the future is to invent it.',
          'Perfect blend of technology and magic.',
          'Chaos is just order waiting to be discovered.',
          'The only way to do great work is to love what you do.',
          'Build tools that reduce chaos.',
          'Design taste and a bias toward shipping.',
          'Technology is a tool. People use tools to improve their lives.',
          'The magic is in the details.',
          'Ship early, ship often.',
          'Make things that matter.'
        ];
        return fortunes[Math.floor(Math.random() * fortunes.length)];
      }
    },
    
    date: {
      description: 'Show current date and time',
      execute: () => {
        const now = new Date();
        return now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        });
      }
    },
    
    echo: {
      description: 'Echo text back',
      execute: (args) => {
        return args.join(' ') || '';
      }
    },
    
    contact: {
      description: 'Get contact information',
      execute: () => {
        return `Contact Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: travis@vocino.com
Website: https://vocino.com
Threads: @vocino
Instagram: @vocino
GitHub: vocino`;
      }
    },
    
    social: {
      description: 'Show social links',
      execute: () => {
        return `Social Links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Threads:  https://threads.com/vocino
Instagram: https://instagram.com/vocino
GitHub:   https://github.com/vocino`;
      }
    }
  };

  // Initialize terminal
  function initTerminal() {
    // Show terminal container
    terminalContainer.classList.add('active');
    
    // Focus input when clicking on terminal
    terminalContainer.addEventListener('click', () => {
      if (!isFocused) {
        terminalInput.focus();
      }
    });

    // Handle input
    terminalInput.addEventListener('keydown', handleKeyDown);
    terminalInput.addEventListener('input', handleInput);
  }

  // Handle keyboard input
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = terminalInput.value.trim();
      
      if (command) {
        // Add to history
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        
        // Show command in output
        const promptText = terminalInput.closest('.terminal-input-line').querySelector('.terminal-prompt').textContent;
        addOutputLine(`${promptText} ${command}`, 'command');
        
        // Execute command
        executeCommand(command);
        
        // Clear input
        terminalInput.value = '';
      }
      
      // On first Enter, focus terminal
      if (!isFocused) {
        focusTerminal();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        if (historyIndex > 0) {
          historyIndex--;
        }
        terminalInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Escape' && isFocused) {
      exitTerminalMode();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion
      const input = terminalInput.value.trim();
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        terminalInput.value = matches[0] + ' ';
      }
    }
  }

  // Handle input changes
  function handleInput() {
    // Input handling if needed
  }

  // Execute command
  function executeCommand(input) {
    const parts = input.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    if (commands[commandName]) {
      try {
        const result = commands[commandName].execute(args);
        if (result !== null && result !== undefined) {
          addOutputLine(result, 'output');
        }
      } catch (error) {
        addOutputLine(`Error: ${error.message}`, 'error');
      }
    } else {
      addOutputLine(`Command not found: ${commandName}. Type "help" for available commands.`, 'error');
    }
  }

  // Add output line
  function addOutputLine(text, type = 'output') {
    if (!text) return;
    
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    
    terminalOutput.appendChild(line);
    terminalOutput.classList.add('has-content');
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Focus terminal mode
  function focusTerminal() {
    isFocused = true;
    terminalContainer.classList.add('focused');
    terminalOverlay.classList.add('active');
    terminalInput.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  // Exit terminal mode
  function exitTerminalMode() {
    isFocused = false;
    terminalContainer.classList.remove('focused');
    terminalOverlay.classList.remove('active');
    terminalInput.blur();
    
    // Clear terminal output
    terminalOutput.innerHTML = '';
    terminalOutput.classList.remove('has-content');
    
    // Clear input
    terminalInput.value = '';
    
    // Clear command history index
    historyIndex = -1;
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminal);
  } else {
    initTerminal();
  }
})();

