import { NextResponse } from 'next/server'

export function withErrorHandling<T extends (...args: any[]) => Promise<Response>>(
  handler: T
): (...args: Parameters<T>) => Promise<Response> {
  return async (...args: Parameters<T>) => {
    try {
      return await handler(...args)
    } catch (err: any) {
      if (err.message === 'TokenExpired') {
        return NextResponse.json({ error: 'TokenExpired' }, { status: 401 })
      }

      console.error('[API ERROR]', err)
      return NextResponse.json({ error: err.message || 'Erro interno' }, { status: 500 })
    }
  }
}
