const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "costume": {
    "detail": {
      _costumeId: (costumeId: string | number) => ({
        "order": {
          $url: (url?: { hash?: string }) => ({ pathname: '/costume/detail/[costumeId]/order' as const, query: { costumeId }, hash: url?.hash, path: `/costume/detail/${costumeId}/order${buildSuffix(url)}` })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/costume/detail/[costumeId]' as const, query: { costumeId }, hash: url?.hash, path: `/costume/detail/${costumeId}${buildSuffix(url)}` })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/costume' as const, hash: url?.hash, path: `/costume${buildSuffix(url)}` })
  },
  "signin": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signin' as const, hash: url?.hash, path: `/signin${buildSuffix(url)}` })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash, path: `/signup${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  assispo_logo_png: '/assispo_logo.png',
  item1_png: '/item1.png',
  item2_png: '/item2.png',
  item3_png: '/item3.png',
  next_svg: '/next.svg',
  vercel_svg: '/vercel.svg'
} as const;

export type StaticPath = typeof staticPath;
