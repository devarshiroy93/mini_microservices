import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList  from './CommentList';

const PostList = () => {


    const [posts, setPosts] = useState({})

    useEffect(() => {
        fetchPosts();
    }, [])
    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        console.log('posts',res.data);
        setPosts(res.data)
    }
    const renderedPosts = Object.values(posts);

    return (
        <div>
            <h1>Posts</h1>
            {renderedPosts.map((post) => {
                return (
                    <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
                        <div className="card-body">
                            <h3>
                                {post.title}
                                
                            </h3>
                            <CommentList comments={post.comments}></CommentList>
                            <CommentCreate postId={post.id}></CommentCreate>
                        </div>
                    </div>
                )
            })}
        </div>)
}

export default PostList