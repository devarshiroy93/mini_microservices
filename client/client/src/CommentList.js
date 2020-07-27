import React from "react";



const CommentList = ({ comments }) => {
  
  const renderedComments = comments.map((c) => {
    let content = '';
    if(c.status === 'approved'){
      content = c.content
    }

    if(c.status === 'rejected'){
      content = 'This comment has been rejected'
    }
    if(c.status === 'pending'){
      content = 'This comments is awaiting moderation'
    }
    return <li key={c.id}>{content}</li>;
  });
  return <ul>{renderedComments}</ul>;
};

export default CommentList;
