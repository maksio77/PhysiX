const CommentList = ({ comments }) => {
  return (
    <div className="flex flex-col items-center w-full mb-4">
      <div className={`w-full sm:w-2/3 md:w-3/4 lg:w-full xl:w-2/3 2xl:w-3/4 mt-4 overflow-y-auto ${comments.length !== 0 ? 'h-80': ''} min-h-16`}>
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
    </div>
  );
};

const Comment = ({ username, text, createdAt }) => {
  return (
    <div className="flex flex-col items-start w-full sm:w-4/5 md:w-4/5 lg:w-full 2xl:w-4/5 mt-4 bg-white border-2 border-primary rounded py-4 px-4 min-h-16 overflow-auto">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
          <p className="text-xl font-semibold text-white">{username[0]}</p>
        </div>
        <div className="ml-2">
          <p className="text-base font-semibold">{username}</p>
          <p className="text-xs text-gray-500">{createdAt}</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-700 break-words w-full">
        {text}
      </p>
    </div>
  );
};

export default CommentList;
