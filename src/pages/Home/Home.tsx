import { useState, type FormEvent } from "react";
import { CreatePostCard } from "../../components/CreatePostCard/CreatePostCard";
import { PostCard } from "../../components/PostCard/PostCard";
import { Button } from "../../components/Button/Button";
import { Pagination } from "../../components/Pagination/Pagination";
import { HomeModals } from "./HomeModals";
import { careersApi } from "../../api/careers";
import { STORAGE_KEYS } from "../../constants/storage";
import { useCareersList, PAGE_SIZE } from "../../hooks/useCareersList";
import styles from "./Home.module.css";

interface HomeProps {
  onLogout: () => void;
}

export function Home({ onLogout }: HomeProps) {
  const username = localStorage.getItem(STORAGE_KEYS.USERNAME) ?? "";
  const {
    posts,
    count,
    isLoading,
    error,
    hasNextPage,
    hasPreviousPage,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    refetch,
  } = useCareersList();
  const [editingPost, setEditingPost] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  async function handleCreatePost(title: string, content: string) {
    await careersApi.create({
      username,
      title,
      content,
      created_datetime: new Date().toISOString(),
      author_ip: "192.192.1.92",
    });
    refetch();
  }

  function handleEdit(id: string) {
    const post = posts.find((p) => p.id === id);
    if (post) setEditingPost({ id: post.id, title: post.title, content: post.content });
  }

  async function handleSaveEdit(e: FormEvent) {
    e.preventDefault();
    if (!editingPost) return;
    const { id, title, content } = editingPost;
    if (!title.trim() || !content.trim()) return;
    await careersApi.update(id, { title: title.trim(), content: content.trim() });
    refetch();
    setEditingPost(null);
  }

  async function handleConfirmDelete() {
    if (!postToDelete) return;
    await careersApi.delete(postToDelete);
    refetch();
    setPostToDelete(null);
  }

  const showPagination = !isLoading && !error && count > PAGE_SIZE;
  const summary =
    totalPages > 1 ? `Page ${currentPage} of ${totalPages}` : undefined;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>CodeLeap Network</h1>
        <Button
          type="button"
          variant="secondary"
          className={styles.logoutBtn}
          onClick={onLogout}
        >
          Logout
        </Button>
      </header>
      <main className={styles.main}>
        <CreatePostCard onSubmit={handleCreatePost} />
        <HomeModals
          editingPost={editingPost}
          postToDelete={postToDelete}
          onCloseEdit={() => setEditingPost(null)}
          onSaveEdit={handleSaveEdit}
          onEditChange={setEditingPost}
          onCloseDelete={() => setPostToDelete(null)}
          onConfirmDelete={handleConfirmDelete}
        />
        <section className={styles.postList} aria-label="Posts">
          {isLoading && (
            <div className={styles.loadingBlock} aria-busy="true" aria-live="polite">
              <div className={styles.loadingSpinner} aria-hidden />
              <p className={styles.loadingText}>Loading posts…</p>
            </div>
          )}
          {error && (
            <div className={styles.errorBlock}>
              <p className={styles.errorMessage}>{error.message}</p>
              <Button type="button" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          )}
          {!isLoading &&
            !error &&
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                username={post.username}
                createdAt={post.createdAt}
                currentUsername={username}
                onEdit={handleEdit}
                onDelete={setPostToDelete}
              />
            ))}
          {showPagination && (
            <Pagination
                hasPrevious={hasPreviousPage}
                hasNext={hasNextPage}
                onPrevious={goToPreviousPage}
                onNext={goToNextPage}
                summary={summary}
              />
          )}
        </section>
      </main>
    </div>
  );
}
