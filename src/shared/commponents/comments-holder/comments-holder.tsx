import React, { FC, useEffect, useState } from 'react';
import { fetchComments } from 'src/api/api';
import { ICommentType } from 'src/api/models';
import { v4 as uuidv4 } from 'uuid';
import Spinner from 'src/shared/commponents/spinner/spinner';
import CommentsHolderItem from './comments-holder-item/comments-holder-item';
import { ICommentHolderProps } from './models/comments-holder.props';
import './comments-holder.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CommentsHolder: FC<ICommentHolderProps> = ({ id, propMessage, commponentName }) => {
  const [comments, setComments] = useState<ICommentType[]>([]);
  const [areCommentsLoading, setAreCommentsLoading] = useState<boolean>(false);

  const getComments = async (): Promise<void> => {
    setAreCommentsLoading(true);
    const fetchedComments = await fetchComments(id as string);
    setComments(fetchedComments);
    setAreCommentsLoading(false);
  };

  useEffect(() => {
    console.log(`${propMessage} ${commponentName}`);
    getComments();
  }, []);

  const renderContet = () => {
    if (!areCommentsLoading) {
      if (comments.length) {
        return (
          comments.map((comment) => (
            <CommentsHolderItem
              name={comment.name}
              body={comment.body}
              propMessage={propMessage}
              commponentName="CommentsItemHoldreItem"
              key={uuidv4()}
            />
          ))
        );
      }
      return (
        <div>There are no comments for this post.</div>
      );
    }
    return <Spinner propMessage={propMessage} commponentName="Spinner" />;
  };

  return (
    <div className="comments-holder">
      {renderContet()}
    </div>
  );
};

export default CommentsHolder;
