import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostById, updatePost, type CreatePostRequest, type Post } from '@entities/post'
import ReactMarkdown from 'react-markdown'
import Modal from 'react-modal'
import { Button } from '@shared/ui/button'
import * as React from 'react'
import { jwtDecode } from 'jwt-decode'

export function PostPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthor, setIsAuthor] = useState(false)

  useEffect(() => {
    async function loadPost() {
      if (!id) {
        return
      }

      try {
        const response = await fetchPostById(id)

        const fetchedPost = response.data
        setPost(response.data)

        const token = localStorage.getItem('access_token')

        if (token) {
          try {
            const decoded = jwtDecode<{ sub?: string; id?: string }>(token)
            const currentUserId = decoded.id ?? decoded.sub
            if (currentUserId && fetchedPost.authorId === currentUserId) {
              setIsAuthor(true)
            }
          } catch (e) {
            console.error('Failed to decode token', e)
          }
        }
      } catch (error) {
        console.error('Failed to load post', error)
      } finally {
        setIsLoading(false)
      }
    }
    void loadPost()
  }, [id])

  async function handleEditSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!id) {
      return
    }

    const formData = new FormData(event.currentTarget)
    const request: CreatePostRequest = {
      name: (formData.get('name') as string) || '',
      description: (formData.get('description') as string) || '',
      markdownContent: (formData.get('markdownContent') as string) || '',
    }

    try {
      const response = await updatePost(id, request)
      if (response.status === 200) {
        setPost({ ...post, ...request } as Post)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to update post', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="post-page">
      <h1>{post.name}</h1>
      <p>{post.description}</p>

      <div className="markdown-content">
        <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
      </div>

      {isAuthor && (
        <Button
          onClick={() => {
            setIsEditing(true)
          }}
        >
          Edit Post
        </Button>
      )}

      {isAuthor && (
        <Modal
          isOpen={isEditing}
          onRequestClose={() => {
            setIsEditing(false)
          }}
          contentLabel="Edit Post Modal"
        >
          <button
            className="modal-close-btn"
            onClick={() => {
              setIsEditing(false)
            }}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 style={{ marginTop: 0 }}>Edit Post</h2>
          <form
            onSubmit={(e) => {
              void handleEditSubmit(e)
            }}
          >
            <input type="text" name="name" defaultValue={post.name} required />
            <input type="text" name="description" defaultValue={post.description} required />
            <textarea
              name="markdownContent"
              defaultValue={post.markdownContent}
              required
              rows={10}
              cols={50}
            />
            <Button type="submit">Save</Button>
          </form>
        </Modal>
      )}
    </div>
  )
}
