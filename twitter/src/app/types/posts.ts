// como los tipos de nuestra database estan generados automaticamente, necesitamos crear este proxy para leer la parte de los posts y sacarlo. (preguntar a Nacho para entender mejor)

import { type Database } from '../types/database'

type PostEntity = Database['public']['Tables']['posts']['Row']
type UserEntity = Database['public']['Tables']['users']['Row']

export type Post = PostEntity & {
  user: UserEntity
}
