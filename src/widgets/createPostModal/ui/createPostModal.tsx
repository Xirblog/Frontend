import { useState } from 'react'
import Modal from 'react-modal'
import { Button } from '@shared/ui/button'
import * as React from 'react'
import { createPost, type CreatePostRequest } from '@entities/post/api/postApi.ts'

export function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false)

  function getStringField(formData: FormData, fieldName: string): string {
    const value = formData.get(fieldName)
    return typeof value === 'string' ? value : ''
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

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
      }
    } catch (error) {
      console.error('Failed to create post, ', error)
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true)
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
        <h2>Create Post</h2>

        <Button
          onClick={() => {
            setIsOpen(false)
          }}
        >
          Close
        </Button>

        <form
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
        >
          <input type="text" name="name" placeholder="Name" required />
          <input type="text" name="description" placeholder="Description" required />
          <textarea name="markdownContent" required />

          <Button type={'submit'}>Create</Button>
        </form>
      </Modal>
    </div>
  )
}
