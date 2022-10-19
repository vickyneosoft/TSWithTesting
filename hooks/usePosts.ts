import {useCallback, useState} from 'react';
import constants from '../constants';
import {Post} from '../types';

const usePosts = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postDetails, setPostDetails] = useState<Post>();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const postsRes = await fetch(constants.baseUrl + constants.postsEndPoint);
      const postsJsonRes = await postsRes.json();
      setLoading(false);
      setPosts(postsJsonRes);
    } catch (err: any) {
      console.log('Error : ', err.message);
      setLoading(false);
      setError(err.message ?? constants.SOMETHING_WENT_WRONG);
    }
  }, []);

  const clearPosts = useCallback(async () => {
    setPosts([]);
  }, []);

  const fetchPostDetails = useCallback(async (postId: number) => {
    try {
      setLoading(true);
      const url = `${constants.baseUrl}${constants.postsEndPoint}/${postId}`;
      const postDetailsRes = await fetch(url);
      const postDetailsJsonRes = await postDetailsRes.json();
      setLoading(false);
      setPostDetails(postDetailsJsonRes);
    } catch (err: any) {
      console.log('Error : ', err.message);
      setLoading(false);
      setError(err.message ?? constants.SOMETHING_WENT_WRONG);
    }
  }, []);

  const clearPostDetails = useCallback(() => {
    setPostDetails(undefined);
  }, []);

  return {
    error,
    isLoading,
    posts,
    postDetails,
    fetchPosts,
    clearPosts,
    fetchPostDetails,
    clearPostDetails,
  };
};

export default usePosts;
