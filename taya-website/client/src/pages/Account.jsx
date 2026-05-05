import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutLocalUser } from '../lib/local-auth'
import { X, User, Mail, Shield, KeyRound } from 'lucide-react'

function Account() {
  const [currentUser, setCurrentUser] = useState(null)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [location.state])

  const handleLogout = () => {
    logoutLocalUser()
    setCurrentUser(null)
    navigate('/auth/login', { replace: true, state: { message: 'You have been signed out.' } })
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPasswordMessage({ type: '', text: '' })

    // Validate passwords
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'All fields are required.' })
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters.' })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' })
      return
    }

    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('taya-auth-users-v1') || '[]')
    const userIndex = storedUsers.findIndex(u => u.email === currentUser.email)

    if (userIndex === -1) {
      setPasswordMessage({ type: 'error', text: 'User not found.' })
      return
    }

    // Verify current password (simple check - in production, use proper hashing)
    if (storedUsers[userIndex].password !== passwordForm.currentPassword) {
      setPasswordMessage({ type: 'error', text: 'Current password is incorrect.' })
      return
    }

    // Update password
    storedUsers[userIndex].password = passwordForm.newPassword
    localStorage.setItem('taya-auth-users-v1', JSON.stringify(storedUsers))

    setPasswordMessage({ type: 'success', text: 'Password changed successfully!' })
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    setTimeout(() => {
      setShowChangePassword(false)
      setPasswordMessage({ type: '', text: '' })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">My Account</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">
                {currentUser ? 'Profile Information' : 'Sign in required'}
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                {currentUser
                  ? 'Manage your details and security settings.'
                  : 'Sign in to access your account details and secure actions.'}
              </p>
            </div>
          </div>

          {location.state?.message ? (
            <p className="mt-6 rounded-lg border border-emerald-700/40 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-300">
              {location.state.message}
            </p>
          ) : null}

          {currentUser ? (
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 lg:col-span-2">
                <h2 className="text-lg font-semibold text-zinc-100">Personal Details</h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                      <User size={14} />
                      Full name
                    </p>
                    <p className="mt-2 text-base font-medium text-zinc-100">{currentUser.fullName}</p>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                      <Mail size={14} />
                      Email
                    </p>
                    <p className="mt-2 text-base font-medium text-zinc-100 break-all">{currentUser.email}</p>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 sm:col-span-2">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                      <Shield size={14} />
                      Role
                    </p>
                    <p className="mt-2 text-base font-medium capitalize text-zinc-100">{currentUser.role || 'customer'}</p>
                  </div>
                </div>
              </section>

              <aside className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
                <h2 className="text-lg font-semibold text-zinc-100">Account Actions</h2>
                <p className="mt-2 text-sm text-zinc-400">Update your security details and session settings.</p>
                <div className="mt-5 space-y-3">
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700 flex items-center justify-center gap-2"
                  >
                    <KeyRound size={16} />
                    Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
                  >
                    Sign out
                  </button>
                </div>
              </aside>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:max-w-md">
              <p className="text-sm text-zinc-400">
                Sign in to view your saved account details and continue shopping.
              </p>
              <Link
                to="/auth/login"
                className="block w-full rounded-lg bg-zinc-100 px-4 py-3 text-center text-sm font-medium tracking-wide text-zinc-900 transition-colors hover:bg-white"
              >
                Sign in
              </Link>
              <Link
                to="/auth/register"
                className="block w-full rounded-lg border border-zinc-600 px-4 py-3 text-center text-sm font-medium tracking-wide text-zinc-100 transition-colors hover:bg-zinc-800"
              >
                Create account
              </Link>
              <Link className="inline-block pt-1 text-sm text-zinc-400 underline underline-offset-4 hover:text-zinc-200" to="/">
                Continue shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md mx-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl shadow-black/40 animate-slideIn">
            <button
              onClick={() => {
                setShowChangePassword(false)
                setPasswordMessage({ type: '', text: '' })
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
              }}
              className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-300"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Security</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-100">Change Password</h2>
            </div>

            {passwordMessage.text && (
              <div className={`mb-6 rounded-lg px-4 py-3 text-sm ${
                passwordMessage.type === 'success'
                  ? 'border border-emerald-700/40 bg-emerald-900/30 text-emerald-300'
                  : 'border border-red-700/40 bg-red-900/30 text-red-300'
              }`}>
                {passwordMessage.text}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                  placeholder="Enter your new password (min 6 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false)
                    setPasswordMessage({ type: '', text: '' })
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
                  }}
                  className="flex-1 rounded-lg border border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account
