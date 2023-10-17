'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const addPost = async (formData: FormData) => {
  const content = formData.get('content')

  if (content === null) return

  const supabase = createServerActionClient({ cookies })
  // revisar si el usuario realmene está autentificado
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  await supabase.from('posts').insert({ content, user_id: user.id })

  // con el revalidatePath, nextJs le da un mensaje a la ruta en el cual le dice que vuelva a entrar al page.tsx, que vuelva a ejecutar las funciones de allí y vuelva a renderizar el contenido html y EN EL CLIENTE, todo aquello que tenga un cambio, lo reconcilie con lo nuevo. ES BUENISIMO!
  revalidatePath(`/?content=${content.toString()}`)
}
