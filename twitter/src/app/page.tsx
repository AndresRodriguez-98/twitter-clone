import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'
import { redirect } from 'next/navigation'
import { type Database } from './types/database'
import { PostLists } from './components/posts-list'
import { ComposePost } from './components/compose-post'
import { IconBell, IconBookmark, IconBrandTwitterFilled, IconFeather, IconHome, IconMail, IconSearch, IconUserCircle } from '@tabler/icons-react'
import { SearchBar } from './components/search-bar'

export default async function Home() {
  // creando los tipos de la database y trayendo solo eso nos ahorramos de traer solo lo que necesitamos y que no se ejecute codigo en vano.
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: session } = await supabase.auth.getSession() // renombramos la data como posts y de los posts agarramos todos con el *

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase.from('posts').select('*, user: users(name, avatar_url, user_name)')

  return (
    <div className='grid grid-cols-12'>
      {/* SECCION DE NAVEGACION */}
      <div className='col-start-1 col-end-4 ml-4'>
        <IconBrandTwitterFilled className='w-8 h-8 my-10' />

        <button className='flex flex-row items-center gap-6'>
          <IconHome className='w-8 h-8 my-10' />
          <h2 className='text-xl font-bold'>Home</h2>
        </button>
        <button className='flex flex-row items-center gap-6'>
          <IconSearch className='w-8 h-8 my-10' />
          <h2 className='text-xl font-bold'>Search</h2>
        </button>
        <button className='flex flex-row items-center gap-6'>
          <IconBell className='w-8 h-8 my-10' />
          <h2 className='text-xl font-bold'>Notifications</h2>
        </button>
        <button className='flex flex-row items-center gap-6'>
          <IconMail className='w-8 h-8 my-10' />
          <h2 className='text-xl font-bold'>Messages</h2>
        </button>
        <button className='flex flex-row items-center gap-6'>
          <IconBookmark className='w-8 h-8 my-10' />
          <h2 className='text-xl font-bold'>Bookmarks</h2>
        </button>
        <button className='flex flex-row items-center gap-6'>
          <IconUserCircle className='w-8 h-8 my-10' />
          <h2 className='text-xl font-bold'>Profile</h2>
        </button>
        <button className='flex flex-row items-center gap-6'>
          <IconFeather className='w-8 h-8 my-10' />
          <h2 className='text-xl font-bold'>Post</h2>
        </button>

      </div>

      {/* SECCION DE TWEETS */}
      <div className='col-start-4 col-end-10 w-full mx-auto border-l border-r border-white/20 min-h-screen'>
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
        <PostLists posts={posts} />
      </div>

      {/* SECCION DE SEARCH Y PERFIL */}
      <div className='col-start-10 col-end-13'>

          <SearchBar />
          <AuthButtonServer />
      </div>

    </div>
  )
}
