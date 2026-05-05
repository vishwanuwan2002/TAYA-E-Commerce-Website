import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Newsletter() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email.trim()) {
      navigate('/auth/register', { state: { email: email.trim() } });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-black">Sign up now</h2>
        <p className="text-gray-500 mb-6">Notifications you won&apos;t want to ignore.</p>
        <form onSubmit={handleSignUp} className="flex gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 border border-r-0 text-sm focus:outline-none focus:border-gray-400 text-black"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
