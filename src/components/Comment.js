import React from 'react';

const Comment = ( {comment} ) => {
  return (
    <div className="question-comments">
      <p>{`${comment.upvote}  ${comment.description} -${comment.authorId && comment.authorId.name}`}</p>
      <hr />
    </div>
  );
};

export default Comment;