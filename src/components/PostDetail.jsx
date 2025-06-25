import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then((res) => res.json())
      .then((user) => {
        setAuthor(user.name);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post.</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {author}</p>
      <p>{post.body}</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default PostDetail;
