import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'

import BlockContent from '@components/block-content'

interface NewsletterProps {
  data: {
    klaviyoListID?: string
    submit?: string
    successMsg?: any[] // Sanity block content
    errorMsg?: any[] // Sanity block content
    terms?: any[] // Sanity block content
  }
}

const Newsletter: React.FC<NewsletterProps> = ({ data = {} }) => {
  const { klaviyoListID, submit = 'Submit', successMsg, errorMsg, terms } = data

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/klaviyo/newsletter-join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listID: klaviyoListID,
          email: email,
        }),
      })

      const data = await res.json()

      setStatus(data.success ? 'success' : 'error')
      if (!data.success) console.log(data.error)
    } catch (err) {
      setStatus('error')
      console.log(err)
    }

    setIsLoading(false)
  }

  return (
    <div className="newsletter">
      <form className="newsletter--form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'success'}
        />

        <button
          type="submit"
          className="btn is-text"
          disabled={isLoading || status === 'success'}
        >
          {isLoading ? 'Loading...' : submit}
        </button>
      </form>

      <AnimatePresence>
        {status === 'success' && successMsg && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="newsletter--success"
          >
            <BlockContent blocks={successMsg} />
          </m.div>
        )}

        {status === 'error' && errorMsg && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="newsletter--error"
          >
            <BlockContent blocks={errorMsg} />
          </m.div>
        )}
      </AnimatePresence>

      {terms && (
        <div className="newsletter--terms">
          <BlockContent blocks={terms} />
        </div>
      )}
    </div>
  )
}

export default Newsletter 