import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../config/api'
import { useAuth } from '../../context/AuthContext'

const initialState = {
  email: '',
  password: '',
}

function Login() {
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login } = useAuth()

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/', { replace: true })
      return
    }

    const prefilledEmail = location.state?.email
    const successMessage = location.state?.message

    if (prefilledEmail) {
      setFormData((current) => ({
        ...current,
        email: prefilledEmail,
      }))
    }

    if (successMessage) {
      setMessage(successMessage)
    }
  }, [location.state, navigate, user])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      const response = await api.post('/auth/login', formData)
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || 'Login failed.')
      }

      login(response.data.user)

      if (response.data.user?.role === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate('/', {
          replace: true,
          state: {
            message: `Welcome back, ${response.data.user?.userName || 'User'}.`,
          },
        })
      }
    } catch (submitError) {
      const errorMsg = submitError?.response?.data?.message || submitError.message || 'Login failed. Please try again.'
      setError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Welcome back</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-black">Sign in</h1>
          <p className="mt-3 text-sm text-gray-600">
            New here?{' '}
            <Link className="font-medium text-black underline underline-offset-4" to="/auth/register">
              Create account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
              required
            />
          </div>

          {message ? (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>
          ) : null}

          {error ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-black px-4 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Continue shopping?{' '}
          <Link className="font-medium text-black underline underline-offset-4" to="/">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
