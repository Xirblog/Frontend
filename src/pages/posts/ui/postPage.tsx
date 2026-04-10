import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostById, updatePost, type CreatePostRequest, type Post } from '@entities/post'
import ReactMarkdown from 'react-markdown'
import Modal from 'react-modal'
import { Button } from '@shared/ui/button'
import * as React from 'react'
import { Navbar } from '@widgets/navbar'
import { getCurrentUser } from '@entities/user'

export function PostPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthor, setIsAuthor] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      if (!id) {
        return
      }

      try {
        const response = await fetchPostById(id)

        const fetchedPost = response.data
        setPost(response.data)

        console.log('fetched post: ', fetchedPost)

        try {
          const userResponse = await getCurrentUser()

          if (userResponse.data.userId === fetchedPost.authorId) {
            setIsAuthor(true)
          }
        } catch (e) {
          console.error('Failed to get current user to check authorship', e)
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
    setErrorMsg(null)

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
    } catch (error: unknown) {
      console.error('Failed to update post', error)
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      setErrorMsg(err.response?.data?.message ?? err.message ?? 'Failed to update post')
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div>Loading...</div>
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div>Post not found</div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="post-page">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <h1 style={{ margin: 0 }}>{post.name}</h1>

          {isAuthor && (
            <Button
              onClick={() => {
                setIsEditing(true)
                setErrorMsg(null)
              }}
            >
              Edit Post
            </Button>
          )}
        </div>

        <div className="markdown-content">
          <ReactMarkdown>{post.markdownContent}</ReactMarkdown>
        </div>

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
              {errorMsg && (
                <div style={{ color: '#ff4d4f', marginBottom: '1rem', marginTop: '1rem' }}>
                  {errorMsg}
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem', marginTop: errorMsg ? '0' : '1rem' }}>
                <Button type="submit">Save</Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </>
  )
}
