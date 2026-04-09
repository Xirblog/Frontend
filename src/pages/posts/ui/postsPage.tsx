import { Navbar } from '@widgets/navbar'
import { PostFeed } from '@widgets/postFeed'
import { CreatePostModal } from '@widgets/createPostModal'

export function PostsPage() {
  return (
    <>
      <Navbar />

      <main>
        <h1>Posts</h1>

        <CreatePostModal />
        <PostFeed />
      </main>
    </>
  )
}
