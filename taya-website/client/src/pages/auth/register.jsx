import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../config/api'
import { useAuth } from '../../context/AuthContext'

const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Register() {
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  useEffect(() => {
    const prefilledEmail = location.state?.email
    if (prefilledEmail) {
      setFormData((current) => ({
        ...current,
        email: prefilledEmail,
      }))
    }
  }, [location.state])

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
    setSuccess('')
    setIsSubmitting(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match.')
      }

      const response = await api.post('/auth/register', {
        userName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || 'Registration failed.')
      }

      setSuccess('Account created successfully. Redirecting to sign in...')
      setTimeout(() => {
        navigate('/auth/login', {
          replace: true,
          state: {
            email: formData.email,
            message: 'Registration successful! Please sign in with your new account.',
          },
        })
      }, 1500)
    } catch (submitError) {
      const errorMsg = submitError?.response?.data?.message || submitError.message || 'Registration failed. Please try again.'
      setError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Create account</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-black">Sign up</h1>
          <p className="mt-3 text-sm text-gray-600">
            Already have an account?{' '}
            <Link className="font-medium text-black underline underline-offset-4" to="/auth/login">
              Sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
              required
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          ) : null}

          {success ? (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-black px-4 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
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

export default Register
