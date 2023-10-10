'use client' // Todos los componentes en Next 13 de forma predeterminada son componentes del servidor, por lo tanto, para la interactividad del lado del cliente, hay que usar este 'use client'.
import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GitHubIcon } from './icons'
import { useRouter } from 'next/navigation'

export function AuthButton ({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback' // POR QUÉ ESTO? --> Cuando haya iniciado sesión el usuario, esto va a devolvernos las credenciales del usuario, para que tenga un token q podamos utilizar, y esto necesitamos guardarlo como una cookie. Esta URL nuestra la vamos a crear para llamar a un método que guarde esta info en una cookie.
      }
    })
  }

  const handleSingOut = async () => {
    await supabase.auth.signOut()
    router.refresh() // el refresh del useRouter hace una nueva request al servidor para la ruta ACTUAL. ASI LOGRAMOS QUE AL INICIAR O CERRA SESIÓN, LA UNICA PARTE QUE SE RECONCILIA ES LA DEL BOTON, SIN RENDERIZAR TODA LA PAG Y QUE SE VEA UN PARPADEO
  }

  return (
    <header>
      {
        session === null
          ? (
            <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 mr-2 mb-2">
              <GitHubIcon />
              Iniciar sesión con Github
            </button>
            )
          : <button onClick={handleSingOut}>SingOut</button>
      }
    </header>
  )
}
