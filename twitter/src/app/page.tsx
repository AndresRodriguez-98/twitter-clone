'use client'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'
import { redirect } from 'next/navigation'
import PostCard from './components/post_card'

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })
  const { data: session } = await supabase.auth.getSession() // renombramos la data como posts y de los posts agarramos todos con el *

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase.from('posts').select('*, users(name, avatar_url, user_name)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      <pre>
        {
          posts?.map(post => {
            const {
              id,
              user_name: userName,
              name: userFullName,
              avatar_url: avatarUrl,
              content
            } = post
            return (
              <PostCard
                content={content}
                key={id}
                userName={userName}
                userFullName={userFullName}
                avatarUrl={avatarUrl}
              />
            )
          })
        }
      </pre>
    </main>
  )
}
