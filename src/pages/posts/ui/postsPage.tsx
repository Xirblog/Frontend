import { fetchPosts, type Post } from '@entities/post'
import { useEffect, useState } from 'react'
import { Navbar } from '@widgets/navbar'
import { PostFeed } from '@widgets/postFeed'
import { CreatePostModal } from '@widgets/createPostModal'
import { useAuth } from '@app/providers/useAuth.ts'

export function PostsPage() {
  const { isAuthenticated } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetchPosts()

      if (response.status !== 200) {
        console.error('Error fetching posts, code: ', response.status)
        return
      }

      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadPosts()
  }, [])

  const handlePostCreated = async (_postId: string) => {
    await loadPosts()
  }

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
          {isAuthenticated ? <CreatePostModal onPostCreated={handlePostCreated} /> : <></>}
        </div>

        <PostFeed posts={posts} isLoading={isLoading} />
      </main>
    </>
  )
}
