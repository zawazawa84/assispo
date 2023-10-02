const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "costume": {
    _costumeId: (costumeId: string | number) => ({
      "order": {
        _orderId: (orderId: string | number) => ({
          "complete": {
            $url: (url?: { hash?: string }) => ({ pathname: '/costume/[costumeId]/order/[orderId]/complete' as const, query: { costumeId, orderId }, hash: url?.hash, path: `/costume/${costumeId}/order/${orderId}/complete${buildSuffix(url)}` })
          }
        }),
        $url: (url?: { hash?: string }) => ({ pathname: '/costume/[costumeId]/order' as const, query: { costumeId }, hash: url?.hash, path: `/costume/${costumeId}/order${buildSuffix(url)}` })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/costume/[costumeId]' as const, query: { costumeId }, hash: url?.hash, path: `/costume/${costumeId}${buildSuffix(url)}` })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/costume' as const, hash: url?.hash, path: `/costume${buildSuffix(url)}` })
  },
  "mypage": {
    "orderhistory": {
      $url: (url?: { hash?: string }) => ({ pathname: '/mypage/orderhistory' as const, hash: url?.hash, path: `/mypage/orderhistory${buildSuffix(url)}` })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/mypage' as const, hash: url?.hash, path: `/mypage${buildSuffix(url)}` })
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