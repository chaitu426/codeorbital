import React from 'react'
import {
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

interface SocialMediaIconProps {
  icon: React.ComponentType<{ className?: string }>
  name: string
  href: string
}

const socialMediaList: SocialMediaIconProps[] = [
  {
    name: 'Twitter',
    icon: FaTwitter,
    href: '#',
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: '#',
  },
  {
    name: 'Pinterest',
    icon: FaPinterest,
    href: '#',
  },
  {
    name: 'Linkedin',
    icon: FaLinkedin,
    href: '#',
  },
  {
    name: 'Tiktok',
    icon: FaTiktok,
    href: '#',
  },
  {
    name: 'Youtube',
    icon: FaYoutube,
    href: '#',
  },
]

function SocialMediaIcon({ icon: Icon, name }: SocialMediaIconProps) {
  return (
    <>
      <Icon className="h-6 w-6" />
      <span className="sr-only">{name}</span>
    </>
  )
}

export function SocialMediaList() {
  return (
    <div className="flex gap-3">
      {socialMediaList.map(({ href, icon, name }) => (
        <a
          className="text-white/50 hover:text-white/90"
          href={href}
          key={name}
          aria-label={name}
        >
          <SocialMediaIcon name={name} icon={icon} href={href} />
        </a>
      ))}
    </div>
  )
}
