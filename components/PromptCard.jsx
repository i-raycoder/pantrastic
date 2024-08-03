import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (session && session.user.id === post.creator?._id) return router.push("/profile");

    router.push(`/profile/${post.creator?._id}?name=${post.creator?.username}`);
  };

  

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          {session && session.user.id === post.creator?._id && session.user.image &&  (
            <Image
              src={session.user.image}
              alt='creator_image'
              width={40}
              height={40}
              className='rounded-full object-cover'
            />
          )}
          {session && session.user.id === post.creator?._id && !session.user.image && (
            <div className='w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center'>
              <span className='font-bold text-lg'>
                 {session.user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {session?.user.id !== post.creator?._id && post.creator?.image && (
            <Image
              src={post.creator.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-cover'
            />
          )}
          {session?.user.id !== post.creator?._id && !post.creator?.image && (
            <div className='w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center'>
              <span className='font-bold text-lg'>
                {post.creator?.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className='flex flex-col'>
          <h3 className='font-satoshi font-semibold text-gray-900 bg-white'>
          {post.creator?.username && post.creator?.username !== '' ? post.        creator?.username : ''}
        </h3>
          </div>
          
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session && session.user.id === post.creator?._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
    
  );
};


export default PromptCard;