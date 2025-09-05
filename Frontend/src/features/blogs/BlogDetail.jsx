import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBlogById } from '../../api/blogService';
import CommentSection from '../comments/CommentSection';
import LikeButton from '../likes/LikeButton';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.blog);
      } catch (err) {
        setError('Unable to load blog.', err);
      }
    };
    fetchBlog();
  }, [id]);

  if (error) {
    return <div className="mt-20 text-lg text-center text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="mt-20 text-lg text-center text-gray-500">Loading blog...</div>;
  }

  const { title, author, createdAt, image, description } = blog;

  return (
    <div className="max-w-5xl px-6 py-16 mx-auto text-gray-800">
      <h1 className="mb-6 text-4xl font-extrabold leading-snug tracking-tight md:text-5xl">
        {title}
      </h1>

      <div className="mb-10 text-sm text-gray-500">
        By <span className="font-semibold text-gray-700">{author?.username || 'Unknown Author'}</span>
        {' | '}
        <span>{createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown Date'}</span>
      </div>

      <div className="relative mb-16">
        {image ? (
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="w-full md:w-1/3">
              <img
                src={`http://localhost:8050${image}`}
                alt="Blog"
                className="object-cover w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="w-full prose prose-lg text-gray-800 md:w-2/3 max-w-none" >
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        ) : (
          <div className="prose prose-lg text-gray-800 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
      </div>

      <div className="mb-12">
        <LikeButton blogId={id} />
      </div>

      <CommentSection blogId={id} />
    </div>
  );
};

export default BlogDetail;