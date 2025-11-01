import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ThemeToggle } from './ThemeToggle';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSignup, setIsSignup] = useState(true);

  const validateUsername = (value: string): string | undefined => {
    if (!value) return 'Username is required';
    if (!/^[A-Z]/.test(value)) {
      return 'Username must start with a capital letter';
    }
    return undefined;
  };

  const validateEmail = (value: string): string | undefined => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address (e.g., example@domain.com)';
    }
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return 'Password is required';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    if (!hasUpperCase) {
      return 'Password must contain at least 1 uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least 1 lowercase letter';
    }
    if (!hasNumber && !hasSpecialChar) {
      return 'Password must contain a number and special character';
    }
    if (!hasNumber) {
      return 'Password must contain at least 1 number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least 1 special character (e.g., @, #, $)';
    }
    return undefined;
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: validateUsername(value) }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: ValidationErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password)
    };

    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key as keyof ValidationErrors] === undefined) {
        delete newErrors[key as keyof ValidationErrors];
      }
    });

    setErrors(newErrors);

    // If no errors, proceed
    if (Object.keys(newErrors).length === 0) {
      // Show success toast
      if (isSignup) {
        toast.success('Account created successfully!', {
          duration: 2000,
          icon: '✅',
        });
      } else {
        toast.success('Login successful!', {
          duration: 2000,
          icon: '✅',
        });
      }
      
      // Delay navigation to show the toast
      setTimeout(() => {
        onLogin(username);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative z-10">
      <ThemeToggle />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🦕</span>
            <h1 className="text-4xl font-bold text-green-700 dark:text-green-400">Dino Reserve</h1>
            <span className="text-4xl">🦖</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Welcome to your prehistoric dining manager!</p>
        </div>

        <Card className="shadow-lg border-2 border-green-200 dark:border-green-700 bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1728848447975-dc7f2aad30af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2FydG9vbiUyMGRpbm9zYXVyJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1OTE0MDczMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cute dino mascot"
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
            <CardTitle className="text-green-700 dark:text-green-400">
              {isSignup ? 'Create Manager Account' : 'Manager Login'}
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              {isSignup ? 'Sign up to manage your dino dining reservations' : 'Sign in to manage your dino dining reservations'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="dark:text-gray-200">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g., RexManager"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className={`border-green-200 dark:border-green-700 focus:border-green-400 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${errors.username ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.username && (
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
                    <span>❌</span> {errors.username}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="manager@dinoreserve.com"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`border-green-200 dark:border-green-700 focus:border-green-400 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
                    <span>❌</span> {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="e.g., Dino@123"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={`border-green-200 dark:border-green-700 focus:border-green-400 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${errors.password ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.password && (
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
                    <span>❌</span> {errors.password}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Must contain: uppercase, lowercase, number, special character
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
              >
                {isSignup ? '🦕 Create Account 🦖' : '🦕 Enter Dino Reserve 🦖'}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setErrors({});
                }}
                className="text-sm text-green-600 dark:text-green-400 hover:underline"
              >
                {isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
            <span>🥬</span>
            Powered by prehistoric technology
            <span>🥬</span>
          </p>
        </div>
      </div>
    </div>
  );
}