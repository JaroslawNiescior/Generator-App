export interface RouteType {
  [route: string]: {
    href: string;
    preHref?: string;
    _restricted: boolean;
  };
}

export const ROUTES: RouteType = {
  app: {
    href: '/',
    _restricted: false,
  },
  generator: {
    href: '/generator/',
    _restricted: true,
  },
  templates: {
    href: '/templates/',
    _restricted: true,
  },
  templateCreate: {
    href: '/templates-create',
    _restricted: true,
  },
  templateUpdate: {
    href: '/templates-edit/:id',
    preHref: '/templates-edit',
    _restricted: true,
  },
  notFound: {
    href: '/404',
    _restricted: false,
  },
  signIn: {
    href: '/sign-in',
    _restricted: false,
  },
  signUp: {
    href: '/sign-up',
    _restricted: false,
  },
  accessForbidden: {
    href: '/403',
    _restricted: false,
  },
};