import { PasswordOptions, PasswordType } from '../types';

const WORDS = [
  'apple', 'river', 'sky', 'blue', 'stone', 'music', 'happy', 'light', 'brave', 'swift',
  'ocean', 'forest', 'mountain', 'cloud', 'star', 'dream', 'coffee', 'book', 'peace', 'smile',
  'tiger', 'eagle', 'lion', 'wolf', 'bear', 'hawk', 'shark', 'whale', 'cobra', 'viper',
  'mars', 'venus', 'saturn', 'pluto', 'earth', 'moon', 'solar', 'lunar', 'comet', 'orbit'
];

export const generatePassword = (options: PasswordOptions): string => {
  const { length, lowercase, uppercase, numbers, symbols, type } = options;

  if (type === PasswordType.MEMORABLE) {
    const wordCount = Math.max(3, Math.floor(length / 5));
    let password = '';
    const separator = numbers ? Math.floor(Math.random() * 10).toString() : '-';
    
    for (let i = 0; i < wordCount; i++) {
      let word = WORDS[Math.floor(Math.random() * WORDS.length)];
      if (uppercase) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      password += word;
      if (i < wordCount - 1) password += separator;
    }
    
    // Add symbol if requested for memorable
    if (symbols) {
      password += '!';
    }
    return password;
  }

  if (type === PasswordType.DASHED) {
    // pattern xxx-xxx-xxx
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const groups = 3;
    const groupSize = 3;
    let parts: string[] = [];
    
    for (let i = 0; i < groups; i++) {
      let part = '';
      for (let j = 0; j < groupSize; j++) {
        const char = charset[Math.floor(Math.random() * charset.length)];
        part += uppercase && Math.random() > 0.5 ? char.toUpperCase() : char;
      }
      parts.push(part);
    }
    return parts.join('-');
  }

  // RANDOM
  let charset = '';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz'; // Fallback

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export const calculateStrength = (password: string): { score: number; text: string; color: string } => {
  let score = 0;
  if (password.length > 8) score += 1;
  if (password.length > 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { score, text: 'Weak', color: 'text-red-500' };
  if (score <= 4) return { score, text: 'Strong', color: 'text-yellow-600' };
  return { score, text: 'Password will take centuries to crack', color: 'text-green-600' };
};

export const downloadPassword = (password: string, filename: string) => {
  if (!password) return;
  const validFilename = filename.trim() || 'password';
  
  // Create blob with UTF-8 encoding support
  const blob = new Blob([password], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${validFilename}.txt`;
  
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
};