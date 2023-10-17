import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'
import { redirect } from 'next/navigation'
import { type Database } from './types/database'
import { PostLists } from './components/posts-list'
import { ComposePost } from './components/compose-post'

export default async function Home () {
  // creando los tipos de la database y trayendo solo eso nos ahorramos de traer solo lo que necesitamos y que no se ejecute codigo en vano.
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: session } = await supabase.auth.getSession() // renombramos la data como posts y de los posts agarramos todos con el *

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase.from('posts').select('*, user: users(name, avatar_url, user_name)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className='max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen'>
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
        <PostLists posts={posts}/>
      </section>
      <AuthButtonServer />
    </main>
  )
}
