import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/common/ui/button'
import { Card, CardContent, CardDescription } from '@/common/ui/card'
import { cn } from '@/common/lib/utils'

const COOKIE_CONSENT_COOKIE = 'cookieConsent=true'
const COOKIE_CONSENT_EXPIRES = 'Fri, 31 Dec 9999 23:59:59 GMT'

type CookieConsentProps = {
  variant?: 'default' | 'small' | 'mini'
  demo?: boolean
  onAcceptCallback?: () => void
  onDeclineCallback?: () => void
  description?: string
}

const DEFAULT_COOKIE_CONSENT_DESCRIPTION =
  'We use cookies to ensure you get the best experience on our website.'

function CookieConsent({
  variant = 'default',
  demo = false,
  onAcceptCallback,
  onDeclineCallback,
  description = DEFAULT_COOKIE_CONSENT_DESCRIPTION,
}: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const handleAccept = useCallback(() => {
    setIsOpen(false)
    document.cookie = `${COOKIE_CONSENT_COOKIE}; expires=${COOKIE_CONSENT_EXPIRES}`
    window.setTimeout(() => {
      setIsHidden(true)
    }, 700)
    onAcceptCallback?.()
  }, [onAcceptCallback])

  const handleDecline = useCallback(() => {
    setIsOpen(false)
    window.setTimeout(() => {
      setIsHidden(true)
    }, 700)
    onDeclineCallback?.()
  }, [onDeclineCallback])

  useEffect(() => {
    try {
      setIsOpen(true)

      if (document.cookie.includes(COOKIE_CONSENT_COOKIE) && !demo) {
        setIsOpen(false)
        window.setTimeout(() => {
          setIsHidden(true)
        }, 700)
      }
    } catch (error) {
      console.warn('Cookie consent error:', error)
    }
  }, [demo])

  if (isHidden) {
    return null
  }

  if (variant !== 'mini') {
    return null
  }

  return (
    <div
      className={cn(
        'fixed right-0 bottom-4 left-0 z-50 w-full transition-all duration-700 sm:left-4 sm:max-w-3xl',
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
      )}
    >
      <Card className="mx-3 p-0 py-3 shadow-lg ring-foreground/10">
        <CardContent className="grid gap-4 p-0 px-3.5 sm:flex sm:items-center">
          <CardDescription className="flex-1 text-xs sm:text-sm">
            {description}
          </CardDescription>
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="h-7 text-xs"
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-7 text-xs"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { CookieConsent }
