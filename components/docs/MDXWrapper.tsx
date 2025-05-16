'use client';

import { ReactNode } from 'react';
import { Redirect } from './Redirect';

interface MDXWrapperProps {
  frontmatter?: {
    type?: string;
    target?: string;
  };
  children: ReactNode;
}

export function MDXWrapper({ frontmatter, children }: MDXWrapperProps) {
  if (frontmatter?.type === 'redirect' && frontmatter.target) {
    return <Redirect to={frontmatter.target} />;
  }
  return <>{children}</>;
} 