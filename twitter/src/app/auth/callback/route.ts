import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

// esto es una opción de Next.js, para evitar que cachee de forma
// estática la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  // si tenemos codigo, creamos el cliente de supabase y hacemos una llamada. La llamada usa el código que le hemos pasado por URL y nos devuelve la sesion del usuario:
  if (code !== null) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }
  // si no tiene codigo, devuelve al usuario a la pagina de origen en la que estaba:
  return NextResponse.redirect(requestUrl.origin)
}
