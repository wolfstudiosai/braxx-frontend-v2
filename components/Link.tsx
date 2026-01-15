"use client";

import NextLink from 'next/link';
import React from 'react';

interface LinkProps extends Omit<React.ComponentProps<typeof NextLink>, 'href'> {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children, className, ...props }) => {
  return (
    <NextLink href={href} className={className} {...props}>
      {children}
    </NextLink>
  );
};
