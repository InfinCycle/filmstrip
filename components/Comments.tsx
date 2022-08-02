import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}



const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {

  const { allUsers, userProfile }: any = useAuthStore();



  return (
    <div className='border-t-2 border-gray-200 pt-4 pl-20 pr-20 mt-4 bg-[#F8F8F8] border-b-2 pb-0'>
      <div className='overflow-scroll h-[430px]'>
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map((user: IUser) => (
                user._id === (item.postedBy._id || item.postedBy._ref) && (
                  <div className=' p-2 items-center' key={idx}>
                    <Link href={`/profile/${user._id}`}>


                        <div className=' flex items-start gap-3'>

                            <div className='w-10 h-10 mt-2'>
                              <Image
                                width={37}
                                height={37}
                                className='rounded-full'
                                src={user.image}
                                alt='user-profile'
                                layout='responsive'
                              />
                            </div>
                            <div className=' xl:block'>
                              <p className='flex gap-1 items-center text-md font-bold text-primary lowercase '>
                                {user.userName.replace(/\s+/g, '')}{' '}
                                <GoVerified className='text-blue-400' />
                              
                              </p>

                              
                              <div>
                                <p className='pointer-events-none'>{item.comment}</p>
                              </div>
                            </div>

                        </div>

                        
                    </Link>
                  
                  
                  </div>
                )

              ))}
            </>
          ))
        ) : (
          <NoResults text="No comments yet"/>
        )}
      </div>

      {userProfile && (
        <div className='bottom-0 left-0 '>
          <form onSubmit={addComment} className='flex gap-4'>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[300px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
              placeholder='Add comment..'
            />
            <button className='text-md text-gray-400 ' onClick={addComment}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}

    </div>
  )
}

export default Comments