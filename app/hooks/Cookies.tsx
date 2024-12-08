import { useState, useEffect } from 'react'

export const useAcceptCookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(true)

  useEffect(() => {
    const cookies = localStorage.getItem('accept_cookies')
    setAcceptedCookies(cookies === 'true')
  }, [])

  const onAcceptCookies = () => {
    localStorage.setItem('accept_cookies', 'true')
    setAcceptedCookies(true)
  }

  return {
    acceptedCookies,
    onAcceptCookies,
  }
}
