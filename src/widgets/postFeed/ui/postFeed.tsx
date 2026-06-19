import { type Post, PostCard } from '@entities/post'

interface PostFeedProps {
  posts: Post[]
  isLoading: boolean
}

export function PostFeed({ posts, isLoading }: PostFeedProps) {
  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="post-feed-grid">
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </div>
    </>
  )
}
