import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState('EMAIL');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const otpInputs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) { setStep('OTP'); setTimer(30); }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) otpInputs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpInputs.current[index - 1].focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.join('').length === 6) {
      localStorage.setItem('vconnect-auth', 'true');
      localStorage.setItem('vconnect-theme', 'light');
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark');
      navigate('/', { replace: true });
    }
  };

  const styles = {
    container: { display: 'flex', width: '100%', height: '100vh', background: 'white', overflow: 'hidden' },
    leftSide: {
      width: '50%',
      background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
      padding: '60px 40px', color: 'white', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    },
    logoCircle: {
      width: '100px', height: '100px', background: 'white', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    },
    brandTitle: { fontSize: '42px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' },
    brandSubtitle: { fontSize: '18px', opacity: 0.9, fontWeight: '400' },
    rightSide: {
      width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f5f3ff', padding: '40px',
    },
    welcomeCard: {
      width: '100%', maxWidth: '440px', background: 'white', borderRadius: '28px',
      padding: '48px 40px', boxShadow: '0 20px 50px rgba(124,58,237,0.08)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative',
    },
    backButton: {
      position: 'absolute', left: '24px', top: '24px', width: '44px', height: '44px',
      borderRadius: '50%', border: '1px solid #e2e8f0', background: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: '#64748b', transition: 'all 0.2s',
    },
    iconCircle: { width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' },
    mailCircle: { background: '#ede9fe' },
    lockCircle: { background: '#f0fdf4' },
    header: { fontSize: '28px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px', textAlign: 'center' },
    subtext: { fontSize: '15px', color: '#64748b', marginBottom: '32px', textAlign: 'center', lineHeight: '1.5' },
    emailHighlight: { color: '#7c3aed', fontWeight: '500', display: 'block', marginTop: '4px' },
    form: { width: '100%' },
    inputGroup: { position: 'relative', marginBottom: '24px' },
    inputIcon: { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
    input: {
      width: '100%', padding: '16px 16px 16px 48px', background: '#f8fafc',
      border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '15px',
      color: '#1e293b', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box',
    },
    otpContainer: { display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '32px' },
    otpInput: {
      width: '54px', height: '60px', background: '#f8fafc', border: '1px solid #e2e8f0',
      borderRadius: '14px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center',
      color: '#1e293b', outline: 'none', transition: 'all 0.2s',
    },
    primaryBtn: {
      width: '100%', padding: '18px', background: '#7c3aed', color: 'white',
      border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: '600',
      cursor: 'pointer', transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(124,58,237,0.3)', marginBottom: '24px',
    },
    linkGroup: { width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' },
    link: { color: '#64748b', textDecoration: 'none', cursor: 'pointer', fontWeight: '500' },
    resendLink: { color: '#7c3aed' },
    timerText: { fontSize: '13px', color: '#94a3b8', marginBottom: '24px' },
    secureFooter: {
      width: '100%', padding: '12px', background: '#f5f3ff', borderRadius: '12px',
      display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748b',
    },
    divider: { width: '100%', display: 'flex', alignItems: 'center', marginBottom: '24px', color: '#94a3b8', fontSize: '13px', fontWeight: '500' },
    dividerLine: { flex: 1, height: '1px', background: '#e2e8f0' },
    dividerText: { margin: '0 16px' },
    googleBtn: {
      width: '100%', padding: '14px', background: 'white', border: '1px solid #e2e8f0',
      borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '12px', color: '#1e293b', fontSize: '15px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s',
    },
  };

  return (
    <div style={styles.container}>
      {/* Left - Branding */}
      <div style={styles.leftSide}>
        <div style={styles.logoCircle}>
          <GraduationCap size={56} color="#7c3aed" fill="#7c3aed" fillOpacity={0.1} />
        </div>
        <h1 style={styles.brandTitle}>VTrust</h1>
        <p style={styles.brandSubtitle}>Connect. Learn. Grow Together.</p>
      </div>

      {/* Right - Form */}
      <div style={styles.rightSide}>
        <div style={styles.welcomeCard}>
          {step === 'OTP' && (
            <button style={styles.backButton} onClick={() => setStep('EMAIL')}
              onMouseOver={e => e.currentTarget.style.background = '#f5f3ff'}
              onMouseOut={e => e.currentTarget.style.background = 'white'}>
              <ArrowLeft size={20} />
            </button>
          )}

          {step === 'EMAIL' ? (
            <>
              <div style={{ ...styles.iconCircle, ...styles.mailCircle }}>
                <Mail size={32} color="#7c3aed" />
              </div>
              <h2 style={styles.header}>Welcome!</h2>
              <p style={styles.subtext}>Enter your email address to continue</p>

              <form style={styles.form} onSubmit={handleEmailSubmit}>
                <div style={styles.inputGroup}>
                  <Mail size={20} style={styles.inputIcon} />
                  <input type="email" placeholder="email@example.com" style={styles.input}
                    value={email} onChange={e => setEmail(e.target.value)}
                    onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 4px rgba(124,58,237,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                    required />
                </div>
                <button type="submit" style={styles.primaryBtn}
                  onMouseOver={e => e.currentTarget.style.background = '#5b21b6'}
                  onMouseOut={e => e.currentTarget.style.background = '#7c3aed'}>
                  Continue
                </button>
              </form>

              <div style={styles.divider}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>OR</span>
                <div style={styles.dividerLine} />
              </div>

              <button type="button" style={styles.googleBtn}
                onMouseOver={e => e.currentTarget.style.background = '#f5f3ff'}
                onMouseOut={e => e.currentTarget.style.background = 'white'}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span style={{ marginLeft: '12px' }}>Sign in with Google</span>
              </button>
            </>
          ) : (
            <>
              <div style={{ ...styles.iconCircle, ...styles.lockCircle }}>
                <Lock size={32} color="#22c55e" />
              </div>
              <h2 style={styles.header}>Enter OTP</h2>
              <p style={styles.subtext}>
                We've sent a 6-digit code to
                <span style={styles.emailHighlight}>{email}</span>
              </p>

              <form style={styles.form} onSubmit={handleVerify}>
                <div style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <input key={index} type="text" maxLength={1} style={styles.otpInput}
                      value={digit} ref={el => otpInputs.current[index] = el}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 4px rgba(124,58,237,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                  ))}
                </div>

                <button type="submit" style={styles.primaryBtn}
                  onMouseOver={e => e.currentTarget.style.background = '#5b21b6'}
                  onMouseOut={e => e.currentTarget.style.background = '#7c3aed'}>
                  Verify & Continue
                </button>

                <div style={styles.linkGroup}>
                  <span style={styles.link} onClick={() => setStep('EMAIL')}>Change email</span>
                  <span style={{ ...styles.link, ...styles.resendLink, opacity: timer > 0 ? 0.5 : 1, cursor: timer > 0 ? 'not-allowed' : 'pointer' }}
                    onClick={() => timer === 0 && setTimer(30)}>Resend OTP</span>
                </div>

                <div style={styles.timerText}>
                  {timer > 0 ? `Resend code in 0:${timer.toString().padStart(2, '0')}` : "You can resend the code now"}
                </div>

                <div style={styles.secureFooter}>
                  <ShieldCheck size={18} color="#7c3aed" />
                  <span>Your code is secure and expires in 10 minutes</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;