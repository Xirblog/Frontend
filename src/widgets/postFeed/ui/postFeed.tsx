import { useEffect, useState } from 'react'
import { fetchPosts, type Post, PostCard } from '@entities/post'

export function PostFeed() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchData = async () => {
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

    void fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </>
  )
}
