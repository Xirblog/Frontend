import { Navbar } from '@widgets/navbar'
import { PostFeed } from '@widgets/postFeed'
import { CreatePostModal } from '@widgets/createPostModal'

export function PostsPage() {
  return (
    <>
      <Navbar />

      <main>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <h1 style={{ margin: 0 }}>Posts</h1>
          <CreatePostModal />
        </div>

        <PostFeed />
      </main>
    </>
  )
}
