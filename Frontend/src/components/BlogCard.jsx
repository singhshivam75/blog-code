import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { _id, title = "Untitled", description = "No description provided.", excerpt, content = "" } = blog;

  const previewText = excerpt || (typeof content === 'string' ? content.slice(0, 100) : "");

  return (
    <div className="p-6 transition-all duration-300 ease-in-out transform bg-white border border-gray-400 shadow-sm rounded-xl hover:shadow-xl hover:-translate-y-1">
      <h2 className="mb-3 text-2xl font-bold text-gray-800 transition-colors duration-200 line-clamp-2 hover:text-blue-600">
        {title}
      </h2>
      
      <p className="mb-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
        {description}
      </p>

      {previewText && (
        <p className="mb-5 text-sm text-gray-500 line-clamp-3">
          {previewText}...
        </p>
      )}

      <div className="pt-4 pb-2 mt-auto text-right ">
        <Link
          to={`/blog/${_id}`}
          className="inline-block px-4 text-sm font-semibold text-blue-600 transition duration-200 hover:text-blue-800"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
