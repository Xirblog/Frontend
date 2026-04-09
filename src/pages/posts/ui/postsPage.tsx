import { Navbar } from '@widgets/navbar'
import { PostFeed } from '@widgets/postFeed'

export function PostsPage() {
  return (
    <>
      <Navbar />

      <main>
        <h1>Posts</h1>

        <PostFeed />
      </main>
    </>
  )
}
