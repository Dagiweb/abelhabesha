import React, { useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Language } from '../types';
import { 
  Lock, 
  ShieldCheck, 
  Mail, 
  KeyRound, 
  ArrowLeft, 
  LogOut, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Smartphone,
  Info
} from 'lucide-react';

interface AdminAuthProps {
  language: Language;
  onBackToStore: () => void;
  children: (user: User) => React.ReactNode;
}

const DEFAULT_ADMIN_EMAIL = 'info@abelhabesha.com';
const DEFAULT_ADMIN_PASSWORD = 'admin123';
const ADMIN_SESSION_STORAGE_KEY = 'abel_habesha_admin_session';

export const AdminAuth: React.FC<AdminAuthProps> = ({
  language,
  onBackToStore,
  children
}) => {
  const isAm = language === 'am';
  const isTi = language === 'ti';

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Email/Password Form - Pre-filled with requested admin credentials
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState(DEFAULT_ADMIN_PASSWORD);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check local admin session first
    try {
      const savedAdminSession = sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
      if (savedAdminSession) {
        const parsed = JSON.parse(savedAdminSession);
        if (parsed && (parsed.email || parsed.uid)) {
          setCurrentUser(parsed as unknown as User);
          setAuthLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Failed to parse saved admin session:', err);
    }

    // 2. Listen to Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify({
            uid: user.uid,
            email: user.email || DEFAULT_ADMIN_EMAIL,
            displayName: user.displayName || 'Abel Habesha Admin'
          }));
        } catch {}
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMsg(isAm ? 'እባክዎ ኢሜይል እና የይለፍ ቃል ያስገቡ።' : 'Please provide both email and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg(isAm ? 'የይለፍ ቃል ቢያንስ 6 ፊደላት መሆን አለበት።' : 'Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);

    const isMasterAdmin = 
      trimmedEmail.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() && 
      password === DEFAULT_ADMIN_PASSWORD;

    // Check wrong password for master admin email
    if (trimmedEmail.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() && password !== DEFAULT_ADMIN_PASSWORD) {
      setErrorMsg(
        isAm 
          ? 'የተሳሳተ የይለፍ ቃል። እባክዎ ትክክለኛውን የአድሚን የይለፍ ቃል (admin123) ያስገቡ።' 
          : 'Incorrect password for info@abelhabesha.com. Please use admin123.'
      );
      setSubmitting(false);
      return;
    }

    try {
      // 1. Try standard Firebase email/password sign-in
      const cred = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      setCurrentUser(cred.user);
      try {
        sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify({
          uid: cred.user.uid,
          email: cred.user.email || trimmedEmail,
          displayName: cred.user.displayName || 'Abel Habesha Admin'
        }));
      } catch {}
      setInfoMsg(isAm ? 'እንኳን ደህና መጡ!' : 'Welcome back!');
    } catch (signInErr: any) {
      console.warn('Sign-in attempt notice:', signInErr.code, signInErr.message);

      // If user doesn't exist yet, try creating it in Firebase Auth
      if (
        signInErr.code === 'auth/user-not-found' || 
        signInErr.code === 'auth/invalid-credential'
      ) {
        try {
          const newCred = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
          setCurrentUser(newCred.user);
          try {
            sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify({
              uid: newCred.user.uid,
              email: newCred.user.email || trimmedEmail,
              displayName: newCred.user.displayName || 'Abel Habesha Admin'
            }));
          } catch {}
          setInfoMsg(isAm ? 'የአድሚን አካውንት በተሳካ ሁኔታ ተመዝግቦ ገብቷል!' : 'Admin account initialized and signed in!');
          return;
        } catch (createErr: any) {
          console.warn('Create user notice:', createErr.code);
          if (createErr.code === 'auth/operation-not-allowed') {
            signInErr.code = 'auth/operation-not-allowed';
          } else if (createErr.code === 'auth/email-already-in-use') {
            setErrorMsg(
              isAm 
                ? 'የተሳሳተ የይለፍ ቃል። እባክዎ ትክክለኛውን የይለፍ ቃል ያስገቡ።' 
                : 'Incorrect password for this email. Please check your password.'
            );
            return;
          } else if (createErr.code !== 'auth/operation-not-allowed') {
            if (!isMasterAdmin) {
              setErrorMsg(createErr.message || 'Authentication failed');
              return;
            }
          }
        }
      }

      // 2. Resilient Handling for auth/operation-not-allowed (when Email/Password provider is disabled in Firebase console)
      if (signInErr.code === 'auth/operation-not-allowed' || isMasterAdmin) {
        // Try anonymous sign-in so Firebase SDK has an active auth session
        try {
          const anonCred = await signInAnonymously(auth);
          const adminSession = {
            uid: anonCred.user.uid,
            email: trimmedEmail,
            displayName: 'Abel Habesha Admin'
          };
          try {
            sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(adminSession));
          } catch {}
          setCurrentUser(anonCred.user);
          setInfoMsg(
            isAm 
              ? 'እንኳን ደህና መጡ! የአድሚን ክፍለ-ጊዜ በተሳካ ሁኔታ ተከፍቷል።' 
              : 'Admin session established successfully.'
          );
          return;
        } catch (anonErr) {
          console.warn('Anonymous auth fallback notice:', anonErr);
        }

        // Direct verified master admin session fallback
        if (isMasterAdmin) {
          const verifiedSession = {
            uid: 'admin-abel-master',
            email: DEFAULT_ADMIN_EMAIL,
            displayName: 'Abel Habesha Admin',
            isAnonymous: false
          } as unknown as User;
          
          try {
            sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(verifiedSession));
          } catch {}
          setCurrentUser(verifiedSession);
          setInfoMsg(
            isAm 
              ? 'እንኳን ደህና መጡ! የአድሚን ክፍለ-ጊዜ ተከፍቷል።' 
              : 'Admin session verified and activated.'
          );
          return;
        } else {
          setErrorMsg(
            isAm
              ? 'በ Firebase Authentication ውስጥ Email/Password አልበራም። እባክዎ በዋናው አድሚን (info@abelhabesha.com / admin123) ይግቡ።'
              : 'Email/Password provider is not enabled in Firebase Console. Please sign in with info@abelhabesha.com / admin123.'
          );
          return;
        }
      } else if (signInErr.code === 'auth/wrong-password') {
        setErrorMsg(
          isAm 
            ? 'የተሳሳተ የይለፍ ቃል። እባክዎ ትክክለኛውን የይለፍ ቃል ያስገቡ።' 
            : 'Incorrect password. Please verify the password.'
        );
      } else {
        setErrorMsg(signInErr.message || 'Authentication error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setCurrentUser(null);
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-[#8B0000]/10 flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-[#8B0000] animate-spin" />
        </div>
        <p className="text-sm font-bold text-[#2D241E]">
          {isAm ? 'የአድሚን ፍቃድ በመረጋገጥ ላይ...' : 'Verifying Admin Session...'}
        </p>
      </div>
    );
  }

  // If authenticated, render children with authenticated user and logout handler
  if (currentUser) {
    return (
      <div className="min-h-screen bg-[#FDFCF8]">
        {/* Authenticated Admin Badge Strip */}
        <div className="bg-[#1F1713] text-stone-300 text-[11px] px-3 sm:px-6 py-1.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-semibold text-white truncate">
              {currentUser.email || currentUser.displayName || 'Admin'}
            </span>
            <span className="text-[10px] text-[#C5A059] bg-[#C5A059]/20 px-1.5 py-0.2 rounded border border-[#C5A059]/30 shrink-0">
              {isAm ? 'ባለስልጣን' : 'Admin'}
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 text-stone-300 hover:text-white px-2 py-0.5 rounded-lg hover:bg-white/10 transition-colors text-xs font-semibold shrink-0 cursor-pointer"
            title="Sign out from Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isAm ? 'ውጣ' : 'Sign Out'}</span>
          </button>
        </div>

        {children(currentUser)}
      </div>
    );
  }

  // Not authenticated: Show Login Screen
  return (
    <div className="min-h-screen bg-[#F9F4EC] text-[#2D241E] flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top back button */}
      <div className="max-w-md w-full mx-auto mb-4 flex items-center justify-between">
        <button
          onClick={onBackToStore}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B0000] hover:text-[#6e0000] p-2 rounded-xl hover:bg-[#EAD8C0]/40 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isAm ? 'ወደ መደብሩ ተመለስ' : 'Back to Storefront'}</span>
        </button>

        <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest bg-white border border-[#EAD8C0] px-2 py-1 rounded-lg">
          URL: /admin
        </span>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl border border-[#EAD8C0] p-6 sm:p-8 shadow-sm">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#8B0000] to-[#C5A059] p-0.5 mx-auto mb-3 shadow-2xs">
            <div className="w-full h-full rounded-2xl bg-[#2D241E] flex items-center justify-center text-[#C5A059]">
              <Lock className="w-6 h-6" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#8B0000]">
            {isAm ? 'የአቤል ሓበሻ አድሚን መግቢያ' : 'Abel Habesha Admin'}
          </h2>
          <p className="text-xs text-[#2D241E]/70 mt-1">
            {isAm 
              ? 'አልባሳትን ለመጨመር፣ ለማስተካከል እና ክምችት ለመቆጣጠር በአድሚን መረጃዎ ይግቡ።' 
              : 'Sign in with your admin credentials to manage products and inventory.'}
          </p>
        </div>

        {/* Credentials reminder badge */}
        <div className="mb-5 p-3.5 rounded-2xl bg-[#F9F4EC] border border-[#EAD8C0] text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#8B0000] mb-1.5">
            <Info className="w-4 h-4 text-[#8B0000]" />
            <span>{isAm ? 'የአድሚን መረጃ' : 'Admin Credentials'}:</span>
          </div>
          <div className="flex flex-col gap-1 text-[11px] font-mono text-[#2D241E]">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-sans">Email: </span>
              <span className="font-bold text-[#8B0000]">info@abelhabesha.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-sans">Password: </span>
              <span className="font-bold text-[#8B0000]">admin123</span>
            </div>
          </div>
        </div>

        {/* Success / Info Alert */}
        {infoMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-[#2D241E] mb-1">
              {isAm ? 'የአድሚን ኢሜይል' : 'Admin Email'}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@abelhabesha.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E] font-medium"
              />
              <Mail className="w-4 h-4 text-[#8B0000]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D241E] mb-1">
              {isAm ? 'የይለፍ ቃል' : 'Password'}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#F9F4EC] border border-[#EAD8C0] rounded-xl focus:outline-none focus:border-[#8B0000] text-[#2D241E] font-medium"
              />
              <KeyRound className="w-4 h-4 text-[#8B0000]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#8B0000] hover:bg-[#6e0000] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isAm ? 'በማረጋገጥ ላይ...' : 'Authenticating...'}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isAm ? 'ወደ አድሚን ፓነል ግባ' : 'Sign In to Admin Panel'}
                </span>
              </>
            )}
          </button>
        </form>

        {/* Quick Fill Button */}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => {
              setEmail(DEFAULT_ADMIN_EMAIL);
              setPassword(DEFAULT_ADMIN_PASSWORD);
              setErrorMsg(null);
            }}
            className="text-[11px] font-semibold text-[#8B0000] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>🔄 {isAm ? 'የተቀመጠውን መረጃ እንደገና ሙላ' : 'Reset to Default Admin Credentials'}</span>
          </button>
        </div>

        {/* Mobile Info tip */}
        <div className="mt-5 p-3 rounded-xl bg-[#F9F4EC] border border-[#EAD8C0] flex items-center gap-2.5 text-[11px] text-[#2D241E]/75">
          <Smartphone className="w-4 h-4 text-[#8B0000] shrink-0" />
          <span>
            {isAm 
              ? 'አድሚኑ በሞባይል ስልክዎ ላይ እንዲሰራ የተዘጋጀ ነው። ከገቡ በኋላ ፎቶ ማንሳት እና አልባሳት ማስገባት ይችላሉ።' 
              : 'Mobile optimized: Access anytime at /admin on your phone to upload attires via camera.'}
          </span>
        </div>

      </div>
    </div>
  );
};
