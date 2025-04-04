import nookies from 'nookies';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

const secret: string = process.env.NEXTAUTH_SECRET ?? "";


export const TokenUtils = {
  save(accessToken: string, ctx = null) {
    globalThis?.localStorage?.setItem(secret, accessToken);
    globalThis?.sessionStorage?.setItem(secret, accessToken);
    nookies.set(ctx, secret, accessToken, {
      maxAge: ONE_YEAR,
      path: '/',
    });
  },
  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[secret] || '';
  },
  delete(ctx = null) {
    globalThis?.localStorage?.removeItem(secret);
    globalThis?.sessionStorage?.removeItem(secret);
    nookies.destroy(ctx, secret);
  },
}

export default TokenUtils