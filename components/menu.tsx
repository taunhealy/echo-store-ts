import React from 'react'
import cx from 'classnames'

import CustomLink from '@components/link'

interface MenuItem {
  _type: string
  title: string
  dropdownItems?: MenuItem[]
  page?: any // Sanity reference
  url?: string
}

interface MenuProps {
  items: MenuItem[]
  className?: string
  onClick?: () => void
}

const Menu: React.FC<MenuProps> = ({ items, className, onClick }) => {
  if (!items) return null

  return (
    <nav className={cx('menu', className)}>
      {items.map((item, key) => {
        const isDropdown = item._type === 'navDropdown'
        const hasDropdown = isDropdown && Array.isArray(item.dropdownItems) && item.dropdownItems.length > 0

        return (
          <div
            key={key}
            className={cx('menu--item', {
              'has-dropdown': hasDropdown,
            })}
          >
            {hasDropdown ? (
              <span className="menu--link is-parent">{item.title}</span>
            ) : (
              <CustomLink
                className="menu--link"
                link={item}
                onClick={onClick}
              />
            )}

            {hasDropdown && (
              <div className="menu--dropdown">
                {item.dropdownItems?.map((dropdownItem, key) => (
                  <CustomLink
                    key={key}
                    className="menu--link"
                    link={dropdownItem}
                    onClick={onClick}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu 