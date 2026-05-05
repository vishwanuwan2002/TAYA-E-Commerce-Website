const USERS_KEY = 'taya-auth-users-v1'
const SESSION_KEY = 'taya-auth-session-v1'

function safeParse(value, fallback) {
  try {
    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function readStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback
  const rawValue = window.localStorage.getItem(key)
  return rawValue ? safeParse(rawValue, fallback) : fallback
}

function writeStorage(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function removeStorage(key) {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(key)
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function stripPassword(user) {
  const { password, ...safeUser } = user
  return safeUser
}

function createUserId() {
  return `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export function getStoredUsers() {
  return readStorage(USERS_KEY, [])
}

export function getCurrentUser() {
  return readStorage(SESSION_KEY, null)
}

export function registerLocalUser({ fullName, email, password, confirmPassword }) {
  const trimmedName = fullName.trim()
  const normalizedEmail = normalizeEmail(email)

  if (!trimmedName) {
    throw new Error('Please enter your full name.')
  }

  if (!normalizedEmail) {
    throw new Error('Please enter your email address.')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.')
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match.')
  }

  const users = getStoredUsers()

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.')
  }

  const newUser = {
    id: createUserId(),
    fullName: trimmedName,
    email: normalizedEmail,
    password,
    role: 'customer',
    createdAt: new Date().toISOString(),
  }

  const nextUsers = [...users, newUser]
  writeStorage(USERS_KEY, nextUsers)

  return stripPassword(newUser)
}

export function loginLocalUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !password) {
    throw new Error('Please enter both email and password.')
  }

  const users = getStoredUsers()
  const matchingUser = users.find(
    (user) => normalizeEmail(user.email) === normalizedEmail && user.password === password
  )

  if (!matchingUser) {
    throw new Error('Invalid email or password.')
  }

  const sessionUser = stripPassword(matchingUser)
  writeStorage(SESSION_KEY, sessionUser)

  return sessionUser
}

export function logoutLocalUser() {
  removeStorage(SESSION_KEY)
}

// Admin registration function (for testing/setup)
export function registerAdminUser({ fullName, email, password }) {
  const trimmedName = fullName.trim()
  const normalizedEmail = normalizeEmail(email)

  if (!trimmedName || !normalizedEmail || !password) {
    throw new Error('All fields are required.')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.')
  }

  const users = getStoredUsers()

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.')
  }

  const newAdmin = {
    id: createUserId(),
    fullName: trimmedName,
    email: normalizedEmail,
    password,
    role: 'admin',
    createdAt: new Date().toISOString(),
  }

  const nextUsers = [...users, newAdmin]
  writeStorage(USERS_KEY, nextUsers)

  return stripPassword(newAdmin)
}
