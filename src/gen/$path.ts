const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "admin": {
    "costume": {
      "edit": {
        _costumeId: (costumeId: string | number) => ({
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/costume/edit/[costumeId]' as const, query: { costumeId }, hash: url?.hash, path: `/admin/costume/edit/${costumeId}${buildSuffix(url)}` })
        })
      },
      "register": {
        $url: (url?: { hash?: string }) => ({ pathname: '/admin/costume/register' as const, hash: url?.hash, path: `/admin/costume/register${buildSuffix(url)}` })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/admin/costume' as const, hash: url?.hash, path: `/admin/costume${buildSuffix(url)}` })
    },
    "order": {
      $url: (url?: { hash?: string }) => ({ pathname: '/admin/order' as const, hash: url?.hash, path: `/admin/order${buildSuffix(url)}` })
    }
  },
  "bank": {
    _orderId: (orderId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/bank/[orderId]' as const, query: { orderId }, hash: url?.hash, path: `/bank/${orderId}${buildSuffix(url)}` })
    })
  },
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
      _orderId: (orderId: string | number) => ({
        "complete": {
          $url: (url?: { hash?: string }) => ({ pathname: '/mypage/orderhistory/[orderId]/complete' as const, query: { orderId }, hash: url?.hash, path: `/mypage/orderhistory/${orderId}/complete${buildSuffix(url)}` })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/mypage/orderhistory/[orderId]' as const, query: { orderId }, hash: url?.hash, path: `/mypage/orderhistory/${orderId}${buildSuffix(url)}` })
      }),
      $url: (url?: { hash?: string }) => ({ pathname: '/mypage/orderhistory' as const, hash: url?.hash, path: `/mypage/orderhistory${buildSuffix(url)}` })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/mypage' as const, hash: url?.hash, path: `/mypage${buildSuffix(url)}` })
  },
  "signin": {
    "reset": {
      $url: (url?: { hash?: string }) => ({ pathname: '/signin/reset' as const, hash: url?.hash, path: `/signin/reset${buildSuffix(url)}` })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/signin' as const, hash: url?.hash, path: `/signin${buildSuffix(url)}` })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash, path: `/signup${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  assispo_favicon_png: '/assispo_favicon.png',
  assispo_logo_png: '/assispo_logo.png',
  next_svg: '/next.svg',
  vercel_svg: '/vercel.svg'
} as const;

export type StaticPath = typeof staticPath;
