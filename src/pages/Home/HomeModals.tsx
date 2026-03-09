import { type FormEvent } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { TextArea } from '../../components/TextArea/TextArea'
import { Modal } from '../../components/Modal/Modal'
import styles from './HomeModals.module.css'

interface EditingPost {
  id: string
  title: string
  content: string
}

interface HomeModalsProps {
  editingPost: EditingPost | null
  postToDelete: string | null
  onCloseEdit: () => void
  onSaveEdit: (e: FormEvent) => void
  onEditChange: (post: EditingPost) => void
  onCloseDelete: () => void
  onConfirmDelete: () => void
}

export function HomeModals({
  editingPost,
  postToDelete,
  onCloseEdit,
  onSaveEdit,
  onEditChange,
  onCloseDelete,
  onConfirmDelete,
}: HomeModalsProps) {
  return (
    <>
      <Modal open={editingPost !== null} onClose={onCloseEdit} title="Edit item">
        {editingPost && (
          <form onSubmit={onSaveEdit} className={styles.editForm}>
            <div className={styles.editTitleGroup}>
              <label className={styles.editLabel} htmlFor="edit-title">
                Title
              </label>
              <Input
                id="edit-title"
                type="text"
                value={editingPost.title}
                onChange={(e) =>
                  onEditChange({ ...editingPost, title: e.target.value })
                }
                placeholder="Hello world"
              />
            </div>
            <div className={styles.editContentGroup}>
              <label className={styles.editLabel} htmlFor="edit-content">
                Content
              </label>
              <TextArea
                id="edit-content"
                value={editingPost.content}
                onChange={(e) =>
                  onEditChange({ ...editingPost, content: e.target.value })
                }
                placeholder="Content here"
              />
            </div>
            <div className={styles.editActions}>
              <Button
                type="button"
                variant="secondary"
                className={styles.modalBtn}
                onClick={onCloseEdit}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
                className={styles.modalBtn}
                disabled={
                  !editingPost.title.trim() || !editingPost.content.trim()
                }
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </Modal>
      <Modal open={postToDelete !== null} onClose={onCloseDelete}>
        <p className={styles.deleteConfirmText}>
          Are you sure you want to delete this item?
        </p>
        <div className={styles.deleteActions}>
          <Button
            type="button"
            variant="secondary"
            className={styles.modalBtn}
            onClick={onCloseDelete}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            className={styles.modalBtn}
            onClick={onConfirmDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}
