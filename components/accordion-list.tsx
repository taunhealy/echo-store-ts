'use client'

import React, { useState } from 'react'
import { AccordionListProps } from '@/app/types/types-components'

import Accordion from '@components/accordion'
import BlockContent from '@components/block-content'

const AccordionList: React.FC<AccordionListProps> = ({ data }) => {
  const { items } = data

  const [activeAccordion, setActiveAccordion] = useState<
    string | number | null
  >(null)

  const onToggle = (id: string | number, status: boolean) => {
    setActiveAccordion(status ? id : null)
  }

  return (
    <div className="accordion-group">
      {items.map((accordion, key) => (
        <Accordion
          key={key}
          id={accordion.id}
          isOpen={accordion.id === activeAccordion}
          onToggle={onToggle}
          title={accordion.title}
        >
          <BlockContent blocks={accordion.content} />
        </Accordion>
      ))}
    </div>
  )
}

export default AccordionList
