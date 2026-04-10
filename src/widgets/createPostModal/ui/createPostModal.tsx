import { useState } from 'react'
import Modal from 'react-modal'
import { Button } from '@shared/ui/button'
import * as React from 'react'
import { createPost, type CreatePostRequest } from '@entities/post/api/postApi.ts'

interface CreatePostModalProps {
  onPostCreated?: (postId: string) => void | Promise<void>
}

export function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  function getStringField(formData: FormData, fieldName: string): string {
    const value = formData.get(fieldName)
    return typeof value === 'string' ? value : ''
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMsg(null)

    try {
      const formData = new FormData(event.currentTarget)

      const request: CreatePostRequest = {
        name: getStringField(formData, 'name'),
        description: getStringField(formData, 'description'),
        markdownContent: getStringField(formData, 'markdownContent'),
      }

      const response = await createPost(request)

      if (response.status === 200) {
        const post_id = response.data
        console.log('Create post with id: ', post_id)
        if (onPostCreated) {
          void onPostCreated(post_id)
        }
        setIsOpen(false)
      }
    } catch (error: unknown) {
      console.error('Failed to create post, ', error)
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      setErrorMsg(err.response?.data?.message ?? err.message ?? 'Failed to create post')
    }
  }

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true)
          setErrorMsg(null)
        }}
      >
        Create Post
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false)
        }}
        contentLabel={'Create Post Modal'}
      >
        <button
          className="modal-close-btn"
          onClick={() => {
            setIsOpen(false)
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 style={{ marginTop: 0 }}>Create Post</h2>

        <form
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
        >
          <input type="text" name="name" placeholder="Name" required />
          <input type="text" name="description" placeholder="Description" required />
          <textarea name="markdownContent" placeholder="Content" required />

          {errorMsg && <div style={{ color: '#ff4d4f', marginBottom: '1rem' }}>{errorMsg}</div>}
          <Button type={'submit'}>Create</Button>
        </form>
      </Modal>
    </div>
  )
}
