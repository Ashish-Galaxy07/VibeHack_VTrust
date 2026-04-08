import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    
    localStorage.setItem('vconnect-auth', 'true');
    navigate('/', { replace: true });
  };

  const styles = {
    container: {
      display: 'flex',
      width: '100%',
      height: '100vh',
      background: 'white',
      overflow: 'hidden',
    },
    leftSide: {
      width: '40%',
      background: 'linear-gradient(135deg, #5483B3 0%, #6a9ac4 100%)',
      padding: '60px 40px',
      color: 'white',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    backLink: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
      textDecoration: 'none',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    icon: {
      width: '80px',
      height: '80px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '30px',
    },
    iconSvg: {
      width: '40px',
      height: '40px',
      fill: 'white',
    },
    h1: {
      fontSize: '32px',
      marginBottom: '15px',
      fontWeight: 'bold',
    },
    description: {
      fontSize: '14px',
      lineHeight: 1.6,
      opacity: 0.9,
    },
    rightSide: {
      width: '60%',
      padding: '50px 50px',
      position: 'relative',
    },
    signupHeaderH2: {
      fontSize: '32px',
      color: '#111827',
      marginBottom: '8px',
    },
    signupHeaderP: {
      fontSize: '13px',
      color: '#6b7280',
      marginBottom: '25px',
    },
    formGroup: {
      marginBottom: '18px',
    },
    label: {
      display: 'block',
      fontSize: '13px',
      color: '#374151',
      marginBottom: '8px',
    },
    inputWrapper: {
      position: 'relative',
    },
    inputIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
      fill: '#9ca3af',
    },
    input: {
      width: '100%',
      padding: '13px 45px',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      fontSize: '14px',
      background: '#f9fafb',
      outline: 'none',
      boxSizing: 'border-box',
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      marginTop: '5px',
    },
    checkbox: {
      width: 'auto',
      marginRight: '8px',
      cursor: 'pointer',
    },
    checkboxLabel: {
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: 0,
      cursor: 'pointer',
    },
    checkboxLink: {
      color: '#5483B3',
      textDecoration: 'none',
    },
    signupBtn: {
      width: '100%',
      padding: '15px',
      background: '#111827',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '18px',
    },
    loginLink: {
      textAlign: 'center',
      fontSize: '13px',
      color: '#6b7280',
    },
    loginLinkA: {
      color: '#5483B3',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <Link 
          to="/login" 
          style={styles.backLink}
          onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.target.style.textDecoration = 'none'}
        >
          ← Back to login
        </Link>
        
        <div style={styles.icon}>
          <svg style={styles.iconSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
          </svg>
        </div>
        <h1 style={styles.h1}>Student Portal</h1>
        <div style={styles.description}>
          Join our community of learners and take the next step in your educational journey.
        </div>
      </div>

      <div style={styles.rightSide}>
        <div>
          <h2 style={styles.signupHeaderH2}>Sign Up</h2>
          <p style={styles.signupHeaderP}>Create your student account to get started.</p>
        </div>

        <form onSubmit={handleSignup}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <input 
                style={styles.input}
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#5483B3';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.background = '#f9fafb';
                }}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input 
                style={styles.input}
                type="password" 
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#5483B3';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.background = '#f9fafb';
                }}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrapper}>
              <svg style={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input 
                style={styles.input}
                type="password" 
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#5483B3';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.background = '#f9fafb';
                }}
                required
              />
            </div>
          </div>

          <div style={styles.checkboxGroup}>
            <input 
              style={styles.checkbox}
              type="checkbox" 
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label htmlFor="terms" style={styles.checkboxLabel}>
              I agree to the <a 
                href="#" 
                style={styles.checkboxLink}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                Terms & Conditions
              </a>
            </label>
          </div>

          <button 
            type="submit" 
            style={styles.signupBtn}
            onMouseOver={(e) => e.target.style.background = '#1f2937'}
            onMouseOut={(e) => e.target.style.background = '#111827'}
          >
            Sign Up
          </button>

          <div style={styles.loginLink}>
            Already have an account? <Link 
              to="/login" 
              style={styles.loginLinkA}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
