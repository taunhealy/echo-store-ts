'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { m, AnimatePresence } from 'framer-motion'
import axios from 'axios'

interface ProductWaitlistProps {
  productID: string
  variantID: string
  title: string
  klaviyoAccountID: string
}

interface WaitlistFormData {
  email: string
  fullname?: string
}

const formAnim = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'linear',
      when: 'afterChildren',
    },
  },
}

const ProductWaitlist: React.FC<ProductWaitlistProps> = ({
  productID,
  variantID,
  title,
  klaviyoAccountID,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormData>()

  const resetForm = (e: React.MouseEvent) => {
    e.preventDefault()
    reset()
    setError(false)
    setSuccess(false)
    setSubmitting(false)
  }

  const onSubmit: SubmitHandler<WaitlistFormData> = async (data) => {
    if (!variantID) {
      setError(true)
      return
    }

    setSubmitting(true)
    setError(false)

    try {
      await axios.post('/api/klaviyo/waitlist-join', {
        accountID: klaviyoAccountID,
        variant: variantID,
        ...data,
      })
      setSubmitting(false)
      setSuccess(true)
    } catch (error) {
      setSubmitting(false)
      setError(true)
      console.log(error)
    }
  }

  return (
    <div className="product--waitlist">
      <AnimatePresence mode="wait" initial={false}>
        {!error && !success && (
          <m.form
            key="form"
            initial="hide"
            animate="show"
            exit="hide"
            variants={formAnim}
            className="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register('fullname')}
              name="fullname"
              autoComplete="off"
              className="control--pot"
            />
            <div className="control--group is-inline">
              <div className={`control${errors.email ? ' has-error' : ''}`}>
                <label htmlFor="email" className="control--label">
                  Email Address
                </label>
                <input
                  {...register('email', {
                    required: 'This field is required.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
                      message: 'Invalid email format.',
                    },
                  })}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="control--input"
                />
                {errors.email && (
                  <p className="control--error">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="control--group is-inline">
              <button
                type="submit"
                className="btn is-primary is-large is-block"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </div>
          </m.form>
        )}
        {error && (
          <m.div
            key="error"
            initial="hide"
            animate="show"
            exit="hide"
            variants={formAnim}
            className="form"
          >
            <div className="control--group is-inline">
              <div className="control has-error">
                <label htmlFor="error" className="control--label">
                  Error
                </label>
                <p className="control--error">{error}</p>
              </div>
            </div>
            <div className="control--group is-inline">
              <button
                type="button"
                className="btn is-primary is-large is-block"
                onClick={resetForm}
              >
                Try Again
              </button>
            </div>
          </m.div>
        )}
        {success && (
          <m.div
            key="success"
            initial="hide"
            animate="show"
            exit="hide"
            variants={formAnim}
            className="form"
          >
            <div className="control--group is-inline">
              <div className="control has-success">
                <label htmlFor="success" className="control--label">
                  Success
                </label>
                <p className="control--success">
                  You've been added to the waitlist!
                </p>
              </div>
            </div>
            <div className="control--group is-inline">
              <button
                type="button"
                className="btn is-primary is-large is-block"
                onClick={resetForm}
              >
                Back to Product
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductWaitlist
