import styled from "styled-components";
import { useRouter } from "next/router";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton";
import useSWR from "swr";
import { Fragment } from "react";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
  text-align: center;
`;

const CommentText = styled.p`
  border-bottom: solid 1px black;
  padding: 20px;
`;

export default function Comments({ locationName }) {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: comments,
    mutate,
    isLoading,
    error,
  } = useSWR(`/api/comments/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  console.log(comments);

  async function handleSubmitComment(event) {
    event.preventDefault();
    console.log("adding comment");

    const commentData = new FormData(event.target);
    const data = Object.fromEntries(commentData);
    const response = await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
      event.target.reset();
    }
  }

  async function handleDeleteComment(comment_id) {
    console.log("deleting comment");

    const response = await fetch(`/api/comments/${comment_id}`, {
      method: "DELETE",
    });
    await mutate();
  }

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h2>{comments.length} fans commented on this place:</h2>
          {comments.map(({ _id, name, comment }) => {
            return (
              <Fragment key={_id}>
                <CommentText>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </CommentText>
                <span>{comment}</span>
                <StyledButton onClick={() => handleDeleteComment(_id)}>
                  X
                </StyledButton>
              </Fragment>
            );
          })}
        </>
      )}
    </Article>
  );
}
