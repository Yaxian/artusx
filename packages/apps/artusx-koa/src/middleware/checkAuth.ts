import { ArtusInjectEnum, Inject, ArtusxContext, ArtusxNext, Middleware } from '@artusx/core';

@Middleware({
  enable: true,
})
export default class CheckAuthMiddleware {
  @Inject(ArtusInjectEnum.Config)
  config: Record<string, string | number>;

  async use(ctx: ArtusxContext, next: ArtusxNext): Promise<void> {
    if (process.env.BENCH_FIND_MY_WAY || process.env.BENCH_KOA_ROUTER) {
      await next();
      return;
    }
    const { data } = ctx.context.output;
    data.authed = false;
    console.log('[middleware] - checkAuth', ctx.context);
    await next();
  }
}
